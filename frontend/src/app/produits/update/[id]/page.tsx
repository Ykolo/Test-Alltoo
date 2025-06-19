"use client";

import { getProduit } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import UpdateProduitForm from "./UpdateProduitForm";

const UpdateProduitPage = () => {
  const params = useParams();
  const id = parseInt(params.id as string);

  const {
    data: produit,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["produit", id],
    queryFn: () => getProduit(id),
    enabled: !!id && !isNaN(id),
  });

  if (isPending) {
    return (
      <div className="container mx-auto p-4">
        <p>Chargement du produit...</p>
      </div>
    );
  }

  if (isError || !produit) {
    return (
      <div className="container mx-auto p-4">
        <p>Erreur lors du chargement du produit.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <UpdateProduitForm produit={produit} />
    </div>
  );
};

export default UpdateProduitPage;
