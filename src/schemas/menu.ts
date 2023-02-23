import * as z from "zod";

const menuVariantSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(0).max(255),
  price: z.coerce.number(),
  categoryId: z.string().min(1).max(255),
});

const menuSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  date: z.coerce.date(),
});

const menuVariantCreationSchema = z.object({
  createMany: z.object({
    data: z.array(menuVariantSchema),
  }),
});

const menuVariantUpdateSchema = z.object({
  createMany: z.object({
    data: z.array(menuVariantSchema),
  }),
  updateMany: z.array(
    z.object({
      where: z.object({
        id: z.string(),
      }),
      data: menuVariantSchema,
    })
  ),
  deleteMany: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1).max(255),
    })
  ),
});

const updateSchema = menuSchema.extend({
  menuVariants: menuVariantUpdateSchema,
});

const createSchema = menuSchema.omit({ id: true }).extend({
  menuVariants: menuVariantCreationSchema,
});

export { createSchema, updateSchema };
