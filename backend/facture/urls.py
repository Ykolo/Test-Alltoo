from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProduitViewSet, FactureViewSet, LigneFactureViewSet

router = DefaultRouter()
router.register(r"produits", ProduitViewSet)
router.register(r"factures", FactureViewSet)
router.register(r"lignes-facture", LigneFactureViewSet)

urlpatterns = [path("", include(router.urls))]
