from rest_framework import serializers
from .models import Attraction, Compilation, CompilationItem


class AttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = '__all__'


class CompilationItemSerializer(serializers.ModelSerializer):
    attraction = AttractionSerializer(read_only=True)
    attraction_id = serializers.PrimaryKeyRelatedField(
        source='attraction', queryset=Attraction.objects.all(), write_only=True
    )

    class Meta:
        model = CompilationItem
        fields = ['id', 'order_index', 'attraction', 'attraction_id']


class CompilationSerializer(serializers.ModelSerializer):
    items = CompilationItemSerializer(source='compilationitem_set', many=True, read_only=True)

    class Meta:
        model = Compilation
        fields = ['id', 'name', 'profile', 'country', 'items', 'created_at', 'updated_at']



