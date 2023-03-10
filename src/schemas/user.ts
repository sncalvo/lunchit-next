import * as z from "zod";

const updateSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255).nullable(),
  role: z.enum(["ADMIN", "EMPLOYEE"]),
  image: z.string().nullable().optional(),
});

const createSchema = updateSchema.omit({ id: true }).merge(
  z.object({
    email: z.string().email(),
  })
);

export { createSchema, updateSchema };
