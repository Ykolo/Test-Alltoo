from rest_framework import viewsets, filters
from .models import Produit, Facture, LigneFacture
from .serializers import ProduitSerializer, FactureSerializer, LigneFactureSerializer


class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.all().order_by("-id")
    serializer_class = ProduitSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["prix", "date_peremption"]


class FactureViewSet(viewsets.ModelViewSet):
    queryset = Facture.objects.all().order_by("-id")
    serializer_class = FactureSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["date_creation"]


class LigneFactureViewSet(viewsets.ModelViewSet):
    queryset = LigneFacture.objects.all().order_by("-id")
    serializer_class = LigneFactureSerializer
