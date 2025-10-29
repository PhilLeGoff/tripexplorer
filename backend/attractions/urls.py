from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AttractionViewSet, CompilationViewSet

router = DefaultRouter()
router.register(r'attractions', AttractionViewSet, basename='attraction')
router.register(r'compilations', CompilationViewSet, basename='compilation')

urlpatterns = [
    path('', include(router.urls)),
]



