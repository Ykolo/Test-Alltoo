import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProduitType } from "@/types/produit";
import { isBefore } from "date-fns";
import { cn } from "../../lib/utils";

const CardProduit = ({ produit }: { produit: ProduitType }) => {
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
    </Card>
  );
};
export default CardProduit;
