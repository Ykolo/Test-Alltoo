from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProduitViewSet, FactureViewSet

router = DefaultRouter()
router.register(r"produits", ProduitViewSet)
router.register(r"facture", FactureViewSet)

urlpatterns = [path("", include(router.urls))]
