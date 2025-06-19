from django.db import models


# facturation/models.py
class Produit(models.Model):
    nom = models.CharField(max_length=255)
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    date_peremption = models.DateField()

    def __str__(self):
        return self.nom


class Facture(models.Model):
    date_creation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Facture {self.id} - {self.date_creation.strftime('%Y-%m-%d %H:%M:%S')}"


class LigneFacture(models.Model):
    facture = models.ForeignKey(
        Facture, related_name="lignes", on_delete=models.CASCADE
    )
    produit = models.ForeignKey(Produit, on_delete=models.CASCADE)
    quantite = models.PositiveIntegerField()

    def __str__(self):
        return f"Ligne {self.id} - Facture {self.facture.id} - Produit {self.produit.nom} - Quantité {self.quantite}"
