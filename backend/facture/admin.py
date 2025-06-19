from django.contrib import admin
from .models import Produit, Facture, LigneFacture


class LigneFactureInline(admin.TabularInline):
    model = LigneFacture
    extra = 1


@admin.register(Produit)
class ProduitAdmin(admin.ModelAdmin):
    list_display = ["nom", "prix", "date_peremption"]
    list_filter = ["date_peremption"]
    search_fields = ["nom"]


@admin.register(Facture)
class FactureAdmin(admin.ModelAdmin):
    list_display = ["id", "date_creation"]
    list_filter = ["date_creation"]
    inlines = [LigneFactureInline]


@admin.register(LigneFacture)
class LigneFactureAdmin(admin.ModelAdmin):
    list_display = ["facture", "produit", "quantite"]
    list_filter = ["facture__date_creation"]
