from rest_framework import serializers
from .models import Produit, Facture, LigneFacture


class ProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = "__all__"


class LigneFactureSerializer(serializers.ModelSerializer):
    produit_nom = serializers.CharField(source="produit.nom", read_only=True)
    produit_prix = serializers.DecimalField(
        source="produit.prix", max_digits=10, decimal_places=2, read_only=True
    )

    class Meta:
        model = LigneFacture
        fields = ["id", "produit", "produit_nom", "produit_prix", "quantite"]


class FactureSerializer(serializers.ModelSerializer):
    lignes = LigneFactureSerializer(many=True)

    class Meta:
        model = Facture
        fields = ["id", "date_creation", "lignes"]

    def create(self, validated_data):
        lignes_data = validated_data.pop("lignes")
        facture = Facture.objects.create(**validated_data)
        for ligne_data in lignes_data:
            LigneFacture.objects.create(facture=facture, **ligne_data)
        return facture

    def update(self, instance, validated_data):
        lignes_data = validated_data.pop("lignes", [])

        # Supprimer toutes les anciennes lignes
        instance.lignes.all().delete()

        # Créer les nouvelles lignes
        for ligne_data in lignes_data:
            LigneFacture.objects.create(facture=instance, **ligne_data)

        return instance
