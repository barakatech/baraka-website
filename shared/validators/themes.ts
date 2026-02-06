import { z } from "zod";

/**
 * Theme image schema
 */
export const ThemeImageSchema = z.object({
  icon: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  smallImageUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  headerImageUrl: z.string().optional(),
  headerImageV2Url: z.string().optional(),
  imageUrlThemed: z.string().optional(),
  smallImageUrlThemed: z.string().optional(),
  thumbnailUrlThemed: z.string().optional(),
  headerImageV2UrlThemed: z.string().optional(),
}).optional().nullable();

/**
 * Theme schema
 */
export const ThemeSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  title: z.string(),
  slug: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  isPremium: z.boolean().optional(),
  image: ThemeImageSchema,
  misc: z.any().nullable().optional(),
  isNew: z.boolean().optional(),
  createdAt: z.string().optional(),
  type: z.enum(['default', 'sector']).optional(),
});

export const ThemeArraySchema = z.array(ThemeSchema);

/**
 * Sector schema (extends Theme)
 */
export const SectorSchema = ThemeSchema;
export const SectorArraySchema = z.array(SectorSchema);

export type Theme = z.infer<typeof ThemeSchema>;
export type Sector = z.infer<typeof SectorSchema>;
