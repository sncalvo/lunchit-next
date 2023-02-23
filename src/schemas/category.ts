import * as z from "zod";

const updateSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
});

const createSchema = updateSchema.omit({ id: true });

export { createSchema, updateSchema };
