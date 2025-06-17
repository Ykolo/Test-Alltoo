from rest_framework import viewsets
from .models import Produit, Facture
from .serializers import ProduitSerializer, FactureSerializer


class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.all().order_by("-id")
    serializer_class = ProduitSerializer


class FactureViewSet(viewsets.ModelViewSet):
    queryset = Facture.objects.all().order_by("-id")
    serializer_class = FactureSerializer
