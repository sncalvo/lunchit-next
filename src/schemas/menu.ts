import * as z from "zod";

const menuVariantSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(0).max(255),
  price: z.coerce.number(),
  categoryId: z.string().min(1).max(255),
  image: z.string().optional().nullable(),
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

const updateFormSchema = updateSchema.merge(
  z.object({
    menuVariants: z.object({
      ...updateSchema.shape.menuVariants.shape,
      createMany: z.object({
        ...updateSchema.shape.menuVariants.shape.createMany.shape,
        data: z.array(
          z.object({
            ...updateSchema.shape.menuVariants.shape.createMany.shape.data
              .element.shape,
            image: z.any().refine((file) => file instanceof File, {
              message: "Must be a file",
            }),
          })
        ),
      }),
      updateMany: z.array(
        z.object({
          where: z.object({
            id: z.string(),
          }),
          data: z.object({
            ...updateSchema.shape.menuVariants.shape.updateMany.element.shape
              .data.shape,
            image: z.any().optional(),
          }),
        })
      ),
    }),
  })
);

const createFormSchema = createSchema.merge(
  z.object({
    menuVariants: z.object({
      createMany: z.object({
        data: z.array(
          z.object({
            ...createSchema.shape.menuVariants.shape.createMany.shape.data
              .element.shape,
            image: z.any().refine((file) => file instanceof File, {
              message: "Must be a file",
            }),
          })
        ),
      }),
    }),
  })
);

export { createSchema, updateSchema, updateFormSchema, createFormSchema };
