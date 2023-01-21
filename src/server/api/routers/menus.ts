import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  adminProviderProcedure,
} from "../trpc";

export const menusRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ menuId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.menu.findUnique({
        where: {
          id: input.menuId,
        },
      });
    }),
  getAll: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.menu.findMany({
        where: {
          companyId: input.companyId,
        },
      });
    }),
  udpateMenu: adminProviderProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        date: z.date(),
        menuVariants: z.object({
          createMany: z.object({
            data: z.array(
              z.object({
                name: z.string(),
                description: z.string(),
                price: z.number(),
                categoryId: z.string(),
              })
            ),
          }),
          updateMany: z.array(
            z.object({
              where: z.object({
                id: z.string(),
              }),
              data: z.array(
                z.object({
                  name: z.string(),
                  description: z.string(),
                  price: z.number(),
                  categoryId: z.string(),
                })
              ),
            })
          ),
          deleteMany: z.array(
            z.object({
              id: z.string(),
            })
          ),
        }),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.menu.update({
        where: { id: input.id },
        data: {
          name: input.name,
          date: input.date,
          menuVariants: input.menuVariants,
        },
      });
    }),
});
