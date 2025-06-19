"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFacture } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { useParams } from "next/navigation";

const FactureDetailPage = () => {
  const params = useParams();
  const id = parseInt(params.id as string);

  const {
    data: facture,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["facture", id],
    queryFn: () => getFacture(id),
    enabled: !!id && !isNaN(id),
  });

  if (isPending) {
    return (
      <div className="container mx-auto p-4">
        <p>Chargement de la facture...</p>
      </div>
    );
  }

  if (isError || !facture) {
    return (
      <div className="container mx-auto p-4">
        <p>Erreur lors du chargement de la facture.</p>
      </div>
    );
  }

  const totalFacture = facture.lignes.reduce((total: number, ligne: any) => {
    const prix =
      typeof ligne.produit_prix === "string"
        ? parseFloat(ligne.produit_prix)
        : ligne.produit_prix;
    const quantite =
      typeof ligne.quantite === "string"
        ? parseInt(ligne.quantite)
        : ligne.quantite;
    return total + prix * quantite;
  }, 0);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Facture #{facture.id}</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/factures/update/${facture.id}`}>Modifier</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/factures">← Retour</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Informations générales */}
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Numéro de facture</p>
                <p className="font-semibold">#{facture.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date de création</p>
                <p className="font-semibold">
                  {format(
                    new Date(facture.date_creation),
                    "dd MMMM yyyy à HH:mm",
                    { locale: fr }
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Nombre de lignes</p>
                <p className="font-semibold">{facture.lignes.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="font-semibold text-xl text-green-600">
                  {totalFacture.toFixed(2)} €
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Détail des lignes */}
        <Card>
          <CardHeader>
            <CardTitle>Détail des produits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Produit</th>
                    <th className="text-center py-2">Prix unitaire</th>
                    <th className="text-center py-2">Quantité</th>
                    <th className="text-right py-2">Total</th>
                  </tr>
                </thead>{" "}
                <tbody>
                  {facture.lignes.map((ligne: any) => {
                    const prix =
                      typeof ligne.produit_prix === "string"
                        ? parseFloat(ligne.produit_prix)
                        : ligne.produit_prix;
                    const quantite =
                      typeof ligne.quantite === "string"
                        ? parseInt(ligne.quantite)
                        : ligne.quantite;
                    const totalLigne = prix * quantite;

                    return (
                      <tr key={ligne.id} className="border-b">
                        <td className="py-3">
                          <div>
                            <p className="font-medium">{ligne.produit_nom}</p>
                          </div>
                        </td>
                        <td className="text-center py-3">
                          {prix.toFixed(2)} €
                        </td>
                        <td className="text-center py-3">{quantite}</td>
                        <td className="text-right py-3 font-medium">
                          {totalLigne.toFixed(2)} €
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-300">
                    <td colSpan={3} className="py-3 font-bold text-right">
                      Total général :
                    </td>
                    <td className="py-3 font-bold text-right text-xl text-green-600">
                      {totalFacture.toFixed(2)} €
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FactureDetailPage;
