import googlemaps
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class GooglePlacesService:
    def __init__(self):
        self.api_key = settings.GOOGLE_PLACES_API_KEY
        if not self.api_key:
            logger.warning("Google Places API key not configured")
            self.client = None
        else:
            self.client = googlemaps.Client(key=self.api_key)
    
    def search_places(self, query, location=None, radius=None, place_type=None):
        """Search for places using Google Places API"""
        if not self.client:
            return []
        
        try:
            # Text search
            if location:
                # Nearby search with location
                places_result = self.client.places_nearby(
                    location=location,
                    radius=radius or 5000,
                    type=place_type,
                    keyword=query
                )
            else:
                # Text search
                places_result = self.client.places(
                    query=query,
                    type=place_type
                )
            
            return places_result.get('results', [])
        except Exception as e:
            logger.error(f"Google Places API error: {e}")
            return []
    
    def get_place_details(self, place_id, fields=None):
        """Get detailed information about a specific place"""
        if not self.client:
            return None
        
        try:
            default_fields = [
                'place_id', 'name', 'formatted_address', 'geometry', 
                'rating', 'user_ratings_total', 'price_level', 'types',
                'opening_hours', 'photos', 'reviews', 'website', 'formatted_phone_number'
            ]
            
            fields_to_request = fields or default_fields
            
            place_details = self.client.place(
                place_id=place_id,
                fields=fields_to_request
            )
            
            return place_details.get('result', {})
        except Exception as e:
            logger.error(f"Google Places Details API error: {e}")
            return None
    
    def search_attractions_by_country(self, country, limit=20):
        """Search for tourist attractions in a specific country"""
        if not self.client:
            return []
        
        try:
            # Search for tourist attractions
            places_result = self.client.places(
                query=f"tourist attractions in {country}",
                type="tourist_attraction"
            )
            
            results = places_result.get('results', [])
            return results[:limit]
        except Exception as e:
            logger.error(f"Google Places country search error: {e}")
            return []
    
    def search_restaurants_by_location(self, location, radius=5000, limit=20):
        """Search for restaurants near a location"""
        if not self.client:
            return []
        
        try:
            places_result = self.client.places_nearby(
                location=location,
                radius=radius,
                type="restaurant"
            )
            
            results = places_result.get('results', [])
            return results[:limit]
        except Exception as e:
            logger.error(f"Google Places restaurant search error: {e}")
            return []
    
    def search_hotels_by_location(self, location, radius=10000, limit=20):
        """Search for hotels near a location"""
        if not self.client:
            return []
        
        try:
            places_result = self.client.places_nearby(
                location=location,
                radius=radius,
                type="lodging"
            )
            
            results = places_result.get('results', [])
            return results[:limit]
        except Exception as e:
            logger.error(f"Google Places hotel search error: {e}")
            return []

# Global instance
google_places_service = GooglePlacesService()


