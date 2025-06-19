"use client";

import { createProduit } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const AddProduitForm = () => {
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [datePeremption, setDatePeremption] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      nom,
      prix,
      date_peremption,
    }: {
      nom: string;
      prix: number;
      date_peremption: string;
    }) => createProduit(nom, prix, date_peremption),
    onSuccess: () => {
      // Invalider et refetch la liste des produits
      queryClient.invalidateQueries({ queryKey: ["produits"] });
      // Réinitialiser le formulaire
      setNom("");
      setPrix("");
      setDatePeremption("");
      alert("Produit ajouté avec succès !");
    },
    onError: (error) => {
      console.error("Erreur lors de l'ajout du produit:", error);
      alert("Erreur lors de l'ajout du produit");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nom || !prix || !datePeremption) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    mutation.mutate({
      nom,
      prix: parseFloat(prix),
      date_peremption: datePeremption,
    });
  };

  return (
    <div>
      <p>Ajouter un nouveau produit</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Prix"
          step="0.01"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date de péremption"
          value={datePeremption}
          onChange={(e) => setDatePeremption(e.target.value)}
          required
        />
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Ajout en cours..." : "Ajouter"}
        </button>
      </form>

      {mutation.isError && (
        <p style={{ color: "red" }}>
          Erreur: {mutation.error?.message || "Une erreur est survenue"}
        </p>
      )}
    </div>
  );
};

export default AddProduitForm;
