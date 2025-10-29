from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Attraction, Compilation, CompilationItem
from .serializers import AttractionSerializer, CompilationSerializer, CompilationItemSerializer
from .services import google_places_service


class AttractionViewSet(viewsets.ModelViewSet):
    queryset = Attraction.objects.all().order_by('-likes', '-rating', '-user_ratings_total')
    serializer_class = AttractionSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'city', 'country', 'category', 'formatted_address']
    ordering_fields = ['likes', 'rating', 'user_ratings_total', 'price_level', 'created_at']
    ordering = ['-likes', '-rating']

    @action(detail=False, methods=['get'])
    def popular(self, request):
        """Get popular attractions by country"""
        country = request.query_params.get('country', 'France')
        limit = int(request.query_params.get('limit', 20))
        
        qs = self.get_queryset().filter(country__icontains=country)
        qs = qs.filter(is_featured=True)[:limit]
        
        return Response(self.get_serializer(qs, many=True).data)

    @action(detail=False, methods=['get'])
    def search(self, request):
        """Search attractions with filters"""
        params = request.query_params
        qs = self.get_queryset()
        
        # Text search
        search_query = params.get('q', '')
        if search_query:
            qs = qs.filter(
                Q(name__icontains=search_query) |
                Q(formatted_address__icontains=search_query) |
                Q(category__icontains=search_query)
            )
        
        # Filters
        if country := params.get('country'):
            qs = qs.filter(country__icontains=country)
        
        if city := params.get('city'):
            qs = qs.filter(city__icontains=city)
        
        if category := params.get('category'):
            qs = qs.filter(category__icontains=category)
        
        if min_rating := params.get('min_rating'):
            qs = qs.filter(rating__gte=float(min_rating))
        
        if min_reviews := params.get('min_reviews'):
            qs = qs.filter(user_ratings_total__gte=int(min_reviews))
        
        if price_level := params.get('price_level'):
            qs = qs.filter(price_level=int(price_level))
        
        if place_type := params.get('type'):
            qs = qs.filter(types__contains=[place_type])
        
        limit = int(params.get('limit', 50))
        return Response(self.get_serializer(qs[:limit], many=True).data)

    @action(detail=False, methods=['post'])
    def sync_from_google(self, request):
        """Sync attractions from Google Places API"""
        country = request.data.get('country', 'France')
        limit = request.data.get('limit', 20)
        place_type = request.data.get('type', 'tourist_attraction')
        
        # Search Google Places
        places = google_places_service.search_attractions_by_country(country, limit)
        
        if not places:
            return Response({'error': 'No places found'}, status=400)
        
        synced_count = 0
        for place in places:
            place_id = place.get('place_id')
            if not place_id:
                continue
            
            # Get details
            details = google_places_service.get_place_details(place_id)
            if not details:
                continue
            
            # Create or update attraction
            attraction, created = Attraction.objects.get_or_create(
                place_id=place_id,
                defaults={
                    'name': details.get('name', ''),
                    'formatted_address': details.get('formatted_address', ''),
                    'country': country,
                    'rating': details.get('rating', 0),
                    'user_ratings_total': details.get('user_ratings_total', 0),
                    'price_level': details.get('price_level'),
                    'raw_data': details,
                }
            )
            
            if created:
                synced_count += 1
        
        return Response({
            'message': f'Synced {synced_count} new attractions from Google Places',
            'total_found': len(places)
        })


class CompilationViewSet(viewsets.ModelViewSet):
    queryset = Compilation.objects.all().order_by('-updated_at')
    serializer_class = CompilationSerializer

    @action(detail=True, methods=['post'])
    def add_item(self, request, pk=None):
        """Add attraction to compilation"""
        compilation = self.get_object()
        attraction_id = request.data.get('attraction_id')
        
        if not attraction_id:
            return Response({'error': 'attraction_id required'}, status=400)
        
        try:
            attraction = Attraction.objects.get(id=attraction_id)
        except Attraction.DoesNotExist:
            return Response({'error': 'Attraction not found'}, status=404)
        
        # Check if already exists
        if CompilationItem.objects.filter(compilation=compilation, attraction=attraction).exists():
            return Response({'error': 'Attraction already in compilation'}, status=400)
        
        # Add to compilation
        CompilationItem.objects.create(
            compilation=compilation,
            attraction=attraction,
            order_index=request.data.get('order_index', 0)
        )
        
        return Response(CompilationSerializer(compilation).data)

    @action(detail=True, methods=['post'])
    def remove_item(self, request, pk=None):
        """Remove attraction from compilation"""
        compilation = self.get_object()
        attraction_id = request.data.get('attraction_id')
        
        if not attraction_id:
            return Response({'error': 'attraction_id required'}, status=400)
        
        CompilationItem.objects.filter(
            compilation=compilation, 
            attraction_id=attraction_id
        ).delete()
        
        return Response(CompilationSerializer(compilation).data)
