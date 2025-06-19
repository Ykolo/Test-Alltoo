"use client";

import { getProduits } from "@/lib/api";
import { ProduitType } from "@/types/produit";
import { useQuery } from "@tanstack/react-query";
import { Link } from "lucide-react";
import { Button } from "../../components/ui/button";
import CardProduit from "./CardProduit";

const ProduitsPage = () => {
  const {
    data: produits,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["produits"],
    queryFn: () => {
      return getProduits();
    },
  });

  if (isPending) {
    return <p>Chargement des produits...</p>;
  }
  if (isError) {
    return <p>Erreur lors du chargement des produits.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Liste des produits</h1>
        <Button asChild>
          <Link href={"produits/new"}>Ajouter un produit</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {produits?.map((produit: ProduitType) => (
          <CardProduit key={produit.id} produit={produit} />
        ))}
      </div>
    </div>
  );
};
export default ProduitsPage;
