import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteProduit } from "@/lib/api";
import { ProduitType } from "@/types/produit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isBefore } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "../../lib/utils";

const CardProduit = ({ produit }: { produit: ProduitType }) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProduit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produits"] });
      toast.success("Produit supprimé avec succès !");
    },
    onError: (error: any) => {
      console.error("Erreur lors de la suppression du produit:", error);
      const errorMessage =
        error?.message || "Erreur lors de la suppression du produit";
      toast.error(errorMessage);
    },
  });

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      deleteMutation.mutate(produit.id);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{produit.nom}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Prix: {produit.prix} €</p>
        <p
          className={cn(
            "text-sm",
            isBefore(new Date(produit.date_peremption), new Date())
              ? "text-red-500"
              : "text-green-500"
          )}
        >
          Date de péremption: {produit.date_peremption}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link href={`/produits/update/${produit.id}`}>Modifier</Link>
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
      </CardFooter>
    </Card>
  );
};
export default CardProduit;
