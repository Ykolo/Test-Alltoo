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
import { updateProduit } from "@/lib/api";
import { ProduitType } from "@/types/produit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  nom: z
    .string()
    .min(1, "Le nom est requis")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  prix: z
    .string()
    .min(1, "Le prix est requis")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, "Le prix doit être un nombre positif"),
  date_peremption: z.string().min(1, "La date de péremption est requise"),
});

type FormData = z.infer<typeof formSchema>;

interface UpdateProduitFormProps {
  produit: ProduitType;
}

const UpdateProduitForm = ({ produit }: UpdateProduitFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: produit.nom,
      prix: produit.prix.toString(),
      date_peremption: produit.date_peremption,
    },
  });

  const mutation = useMutation({
    mutationFn: ({
      nom,
      prix,
      date_peremption,
    }: {
      nom: string;
      prix: number;
      date_peremption: string;
    }) => updateProduit(produit.id, nom, prix, date_peremption),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produits"] });
      toast.success("Produit modifié avec succès !");
      // Rediriger vers la page produits après succès
      router.push("/produits");
    },
    onError: (error) => {
      console.error("Erreur lors de la modification du produit:", error);
      toast.error("Erreur lors de la modification du produit");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({
      nom: data.nom,
      prix: parseFloat(data.prix),
      date_peremption: data.date_peremption,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Modifier le produit</CardTitle>
        <CardDescription>
          Modifiez les informations du produit ci-dessous
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du produit</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrez le nom du produit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix (€)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_peremption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de péremption</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/produits")}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="flex-1"
              >
                {mutation.isPending ? "Modification..." : "Modifier"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateProduitForm;
