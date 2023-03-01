import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  adminProviderProcedure,
} from "../trpc";

export const providersRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.company.findFirst({
        where: {
          id: input.id,
          type: "PROVIDER",
        },
        include: {
          menus: {
            where: {
              date: {
                gte: new Date(),
              },
            },
            include: {
              menuVariants: true,
            },
          },
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.company.findMany({ where: { type: "PROVIDER" } });
  }),
  udpateCompany: adminProviderProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        address: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      if (input.id !== ctx.session.user.companyId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.prisma.company.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          address: input.address,
        },
      });
    }),
});
