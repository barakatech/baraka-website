import { z } from "zod";

/**
 * Generic API response wrapper
 */
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    error: z.string().optional(),
    message: z.string().optional(),
  });

/**
 * API error response schema
 */
export const ApiErrorSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  statusCode: z.number().optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

/**
 * Validate and parse API response
 * Throws ZodError if validation fails
 */
export function validateApiResponse<T>(
  schema: z.ZodType<T>,
  data: unknown
): T {
  return schema.parse(data);
}

/**
 * Safely validate API response
 * Returns result object with success flag
 */
export function safeValidateApiResponse<T>(
  schema: z.ZodType<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
