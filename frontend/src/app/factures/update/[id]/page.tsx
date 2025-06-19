"use client";

import { getFacture } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import UpdateFactureForm from "../UpdateFactureForm";

const UpdateFacturePage = () => {
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

  return (
    <div className="container mx-auto p-4">
      <UpdateFactureForm facture={facture} />
    </div>
  );
};

export default UpdateFacturePage;
