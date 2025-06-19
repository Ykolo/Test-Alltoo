import z from "zod";

export const LigneFactureSchema = z.object({
  id: z.number(),
  produit: z.number(),
  produit_nom: z.string(),
  produit_prix: z.number(),
  quantite: z.number(),
});

export const FactureSchema = z.object({
  id: z.number(),
  date_creation: z.string(),
  lignes: z.array(LigneFactureSchema),
});

export type LigneFactureType = z.infer<typeof LigneFactureSchema>;
export type FactureType = z.infer<typeof FactureSchema>;
