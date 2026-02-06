import { z } from "zod";

/**
 * Tracker schema
 */
export const TrackerSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string().optional(),
  type: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

export const TrackerArraySchema = z.array(TrackerSchema);

export type Tracker = z.infer<typeof TrackerSchema>;
