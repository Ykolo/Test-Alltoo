"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getProduits, updateFacture } from "@/lib/api";
import { FactureType } from "@/types/facture";
import { ProduitType } from "@/types/produit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const ligneSchema = z.object({
  produit: z.string().min(1, "Produit requis"),
  quantite: z
    .string()
    .min(1, "Quantité requise")
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num > 0;
    }, "La quantité doit être un nombre positif"),
});

const formSchema = z.object({
  lignes: z.array(ligneSchema).min(1, "Au moins une ligne est requise"),
});

type FormData = z.infer<typeof formSchema>;

interface UpdateFactureFormProps {
  facture: FactureType;
}

const UpdateFactureForm = ({ facture }: UpdateFactureFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lignes: facture.lignes.map((ligne) => ({
        produit: ligne.produit.toString(),
        quantite: ligne.quantite.toString(),
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lignes",
  });

  // Récupérer la liste des produits
  const { data: produits } = useQuery({
    queryKey: ["produits"],
    queryFn: () => getProduits(),
  });

  // Calculer le total de la facture en temps réel
  const watchedLignes = form.watch("lignes");
  const totalFacture = watchedLignes.reduce((total, ligne) => {
    if (ligne.produit && ligne.quantite) {
      const produit = produits?.find(
        (p: ProduitType) => p.id.toString() === ligne.produit
      );
      if (produit) {
        return total + produit.prix * parseInt(ligne.quantite || "0");
      }
    }
    return total;
  }, 0);

  const mutation = useMutation({
    mutationFn: (lignesData: { produit: number; quantite: number }[]) => {
      return updateFacture(facture.id, { lignes: lignesData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["factures"] });
      queryClient.invalidateQueries({ queryKey: ["facture", facture.id] });
      toast.success("Facture modifiée avec succès !");
      router.push("/factures");
    },
    onError: (error) => {
      console.error("Erreur lors de la modification de la facture:", error);
      toast.error("Erreur lors de la modification de la facture");
    },
  });

  const onSubmit = (data: FormData) => {
    const lignesData = data.lignes.map((ligne) => ({
      produit: parseInt(ligne.produit),
      quantite: parseInt(ligne.quantite),
    }));

    mutation.mutate(lignesData);
  };

  const addLigne = () => {
    append({ produit: "", quantite: "" });
  };

  const removeLigne = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Modifier la facture #{facture.id}</CardTitle>
        <CardDescription>
          Modifiez les produits et leurs quantités de cette facture
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Lignes de facture</h3>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg"
                >
                  <FormField
                    control={form.control}
                    name={`lignes.${index}.produit`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Produit</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">Sélectionnez un produit</option>
                            {produits?.map((produit: ProduitType) => (
                              <option
                                key={produit.id}
                                value={produit.id.toString()}
                              >
                                {produit.nom} - {produit.prix}€
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`lignes.${index}.quantite`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantité</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            placeholder="1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeLigne(index)}
                      disabled={fields.length === 1}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addLigne}
                className="w-full"
              >
                + Ajouter une ligne
              </Button>
            </div>

            {/* Affichage du total */}
            {totalFacture > 0 && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">
                    Total de la facture :
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    {totalFacture.toFixed(2)} €
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/factures")}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1"
              >
                {mutation.isPending ? "Modification..." : "Modifier la facture"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateFactureForm;
