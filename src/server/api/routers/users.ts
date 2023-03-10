import { z } from "zod";

import { createTRPCRouter, protectedProcedure, adminProcedure } from "../trpc";

import { createSchema, updateSchema } from "../../../schemas/user";

export const usersRouter = createTRPCRouter({
  get: adminProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { id: input.id, companyId: ctx.session.user.companyId },
        include: {
          orders: true,
          accounts: true,
        },
      });

      if (user === null) {
        throw new Error("User not found");
      }

      return user;
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findMany({
      where: {
        companyId: ctx.session.user.companyId,
      },
    });
  }),
  create: adminProcedure.input(createSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.user.create({
      data: { ...input, companyId: ctx.session.user.companyId },
    });
  }),
  update: adminProcedure.input(updateSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.user.update({
      where: { id: input.id },
      data: input,
    });
  }),
  updateSelf: protectedProcedure
    .input(updateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });
    }),
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.delete({ where: { id: input.id } });
    }),
});
