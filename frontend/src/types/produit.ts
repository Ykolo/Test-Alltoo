import z from "zod";

const ProduitSchema = z.object({
  id: z.number(),
  nom: z.string(),
  prix: z.number(),
  date_peremption: z.string(),
});

export type ProduitType = z.infer<typeof ProduitSchema>;
