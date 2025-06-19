import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteFacture } from "@/lib/api";
import { FactureType } from "@/types/facture";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { toast } from "sonner";

const CardFacture = ({ facture }: { facture: FactureType }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteFacture(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["factures"] });
      toast.success("Facture supprimée avec succès !");
    },
    onError: (error: any) => {
      console.error("Erreur lors de la suppression de la facture:", error);
      const errorMessage =
        error?.message || "Erreur lors de la suppression de la facture";
      toast.error(errorMessage);
    },
  });

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette facture ?")) {
      deleteMutation.mutate(facture.id);
    }
  };
  const totalFacture = facture.lignes.reduce((total, ligne) => {
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
    <Card>
      <CardHeader>
        <CardTitle>Facture #{facture.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          Date:{" "}
          {format(new Date(facture.date_creation), "dd MMMM yyyy", {
            locale: fr,
          })}
        </p>
        <p className="text-sm">Nombre de lignes: {facture.lignes.length}</p>
        <p className="font-semibold text-lg">
          Total: {totalFacture.toFixed(2)} €
        </p>
        <div className="mt-2">
          <p className="text-xs text-gray-500">Produits:</p>
          {facture.lignes.slice(0, 2).map((ligne) => (
            <p key={ligne.id} className="text-xs">
              • {ligne.produit_nom} x{ligne.quantite}
            </p>
          ))}
          {facture.lignes.length > 2 && (
            <p className="text-xs text-gray-400">
              ... et {facture.lignes.length - 2} autre(s)
            </p>
          )}
        </div>
      </CardContent>{" "}
      <CardFooter className="flex flex-col gap-2">
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/factures/${facture.id}`}>Voir détails</Link>
        </Button>
        <div className="flex gap-2 w-full">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href={`/factures/update/${facture.id}`}>Modifier</Link>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "..." : "Supprimer"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardFacture;
