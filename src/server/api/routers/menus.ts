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
        include: {
          menuVariants: true,
        },
      });
    }),
  getAll: publicProcedure
    .input(z.object({ companyId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      let companyId = input.companyId;

      if (ctx.session && ctx.session.user) {
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.session.user.id },
          include: { company: true },
        });

        if (user && user.company.type === "PROVIDER") {
          companyId ||= user.companyId;
        }
      }

      return ctx.prisma.menu.findMany({
        where: {
          companyId,
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
