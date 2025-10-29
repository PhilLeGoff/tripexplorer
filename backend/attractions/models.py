from django.db import models


class Attraction(models.Model):
    # Google Places ID
    place_id = models.CharField(max_length=255, unique=True, db_index=True)
    
    # Basic info
    name = models.CharField(max_length=255)
    formatted_address = models.TextField(blank=True, default='')
    country = models.CharField(max_length=100, db_index=True)
    city = models.CharField(max_length=120, blank=True, default='')
    
    # Categories and types
    category = models.CharField(max_length=80, blank=True, default='')
    types = models.JSONField(default=list, blank=True)  # Google Places types
    
    # Ratings and reviews
    rating = models.FloatField(default=0)
    user_ratings_total = models.IntegerField(default=0)
    price_level = models.IntegerField(null=True, blank=True)  # 0-4 scale
    
    # Location
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    
    # Additional info
    description = models.TextField(blank=True, default='')
    website = models.URLField(blank=True, default='')
    phone_number = models.CharField(max_length=50, blank=True, default='')
    
    # Photos and media
    photo_reference = models.CharField(max_length=255, blank=True, default='')
    photos_count = models.IntegerField(default=0)
    
    # Opening hours
    opening_hours = models.JSONField(default=dict, blank=True)
    
    # Reviews
    reviews = models.JSONField(default=list, blank=True)
    
    # Custom fields
    likes = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    
    # Raw Google Places data
    raw_data = models.JSONField(default=dict, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=["country", "rating"]),
            models.Index(fields=["city", "category"]),
            models.Index(fields=["is_featured", "likes"]),
        ]
        ordering = ["-likes", "-rating", "-user_ratings_total"]

    def __str__(self) -> str:
        return f"{self.name} ({self.city or self.country})"
    
    @property
    def price_level_display(self):
        """Convert numeric price level to $ symbols"""
        if self.price_level is None:
            return ""
        return "$" * (self.price_level + 1)
    
    @property
    def primary_type(self):
        """Get the primary type from Google Places types"""
        if not self.types:
            return self.category or "attraction"
        
        # Priority order for display
        priority_types = [
            'tourist_attraction', 'museum', 'park', 'restaurant', 
            'lodging', 'shopping_mall', 'amusement_park', 'zoo'
        ]
        
        for ptype in priority_types:
            if ptype in self.types:
                return ptype.replace('_', ' ').title()
        
        return self.types[0].replace('_', ' ').title()


class Compilation(models.Model):
    name = models.CharField(max_length=120, default="Ma compilation")
    profile = models.CharField(max_length=20, default="tourist")  # local/tourist/pro
    country = models.CharField(max_length=100)
    items = models.ManyToManyField(Attraction, through='CompilationItem', related_name='compilations')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"Compilation {self.name} - {self.country}"
    
    @property
    def total_budget(self):
        """Calculate total budget based on price levels"""
        total = 0
        for item in self.items.all():
            if item.price_level is not None:
                total += item.price_level + 1
        return total


class CompilationItem(models.Model):
    compilation = models.ForeignKey(Compilation, on_delete=models.CASCADE)
    attraction = models.ForeignKey(Attraction, on_delete=models.CASCADE)
    order_index = models.IntegerField(default=0)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("compilation", "attraction")
        ordering = ["order_index"]

    def __str__(self) -> str:
        return f"{self.compilation.name} - {self.attraction.name}"
