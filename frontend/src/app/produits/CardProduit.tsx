import { Badge } from "@/components/ui/badge";
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
import { addDays, isBefore, isWithinInterval } from "date-fns";
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

  const today = new Date();
  const expirationDate = new Date(produit.date_peremption);
  const isExpired = isBefore(expirationDate, today);
  const isExpiringSoon = isWithinInterval(expirationDate, {
    start: today,
    end: addDays(today, 7), // Expire dans les 7 prochains jours
  });

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="flex-1">{produit.nom}</CardTitle>
          <div className="flex flex-col gap-1">
            {isExpired && <Badge variant="destructive">Expiré</Badge>}
            {!isExpired && isExpiringSoon && (
              <Badge variant="warning">Expire bientôt</Badge>
            )}
          </div>
        </div>
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
