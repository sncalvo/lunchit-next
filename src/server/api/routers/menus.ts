import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  adminProviderProcedure,
} from "../trpc";

import { createSchema, updateSchema } from "../../../schemas/menu";

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
  create: adminProviderProcedure
    .input(createSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.menu.create({
        data: { ...input, companyId: ctx.session.user.companyId },
      });
    }),
  update: adminProviderProcedure
    .input(updateSchema)
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
