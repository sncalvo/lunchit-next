import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const menuVariantsRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.menuVariant.findUnique({
        where: {
          id: input.id,
        },
        include: {
          menu: true,
        },
      });
    }),
});
