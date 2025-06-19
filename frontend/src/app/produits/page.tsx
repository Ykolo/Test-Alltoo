"use client";

import { getProduits } from "@/lib/api";
import { ProduitType } from "@/types/produit";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { Pagination } from "../../components/Pagination";
import { Button } from "../../components/ui/button";
import CardProduit from "./CardProduit";

const ProduitsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: produitsData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["produits", currentPage],
    queryFn: () => getProduits(currentPage),
  });

  if (isPending) {
    return <p>Chargement des produits...</p>;
  }
  if (isError) {
    return <p>Erreur lors du chargement des produits.</p>;
  }

  const produits = produitsData?.results || [];
  const totalPages = Math.ceil((produitsData?.count || 0) / 5);

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

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            hasNext={!!produitsData?.next}
            hasPrevious={!!produitsData?.previous}
          />
        </div>
      )}
    </div>
  );
};
export default ProduitsPage;
