import { createSchema } from "../../../schemas/category";
import { createTRPCRouter, adminProviderProcedure } from "../trpc";

export const categoriesRouter = createTRPCRouter({
  getAll: adminProviderProcedure.query(({ ctx }) => {
    const companyId = ctx.session.user.companyId;

    return ctx.prisma.category.findMany({
      where: {
        companyId,
      },
    });
  }),
  create: adminProviderProcedure
    .input(createSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.category.create({
        data: {
          name: input.name,
          companyId: ctx.session.user.companyId,
        },
      });
    }),
});
