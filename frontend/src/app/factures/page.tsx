"use client";

import { getFactures } from "@/lib/api";
import { FactureType } from "@/types/facture";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { Pagination } from "../../components/Pagination";
import { Button } from "../../components/ui/button";
import CardFacture from "./CardFacture";

const FacturesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: facturesData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["factures", currentPage],
    queryFn: () => getFactures(currentPage),
  });

  if (isPending) {
    return <p>Chargement des factures...</p>;
  }
  if (isError) {
    return <p>Erreur lors du chargement des factures.</p>;
  }

  const factures = facturesData?.results || [];
  const totalPages = Math.ceil((facturesData?.count || 0) / 5);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Liste des factures</h1>
        <Button asChild>
          <Link href={"factures/new"}>Créer une facture</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {factures?.map((facture: FactureType) => (
          <CardFacture key={facture.id} facture={facture} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            hasNext={!!facturesData?.next}
            hasPrevious={!!facturesData?.previous}
          />
        </div>
      )}
    </div>
  );
};

export default FacturesPage;
