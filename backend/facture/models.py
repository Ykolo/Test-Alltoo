from django.db import models


# Create your models here.
class Produit(models.Model):
    nom = models.CharField(max_length=100)
    prix = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )
    date_peremption = models.DateField()

    def __str__(self):
        return self.nom


class Facture(models.Model):
    produits = models.ManyToManyField(Produit)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Facture {self.pk} - {self.date.date()}"
