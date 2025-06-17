from rest_framework import serializers
from .models import Produit, Facture


class ProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = "__all__"


class FactureSerializer(serializers.ModelSerializer):
    produits = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Produit.objects.all()
    )

    class Meta:
        model = Facture
        fields = [
            "id",
            "produits",
            "date",
        ]
