import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { Session } from "next-auth";

import { getServerAuthSession } from "../auth";
import { prisma } from "../db";

type CreateContextOptions = {
  session: Session | null;
};

const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

export type TRPCContext = ReturnType<typeof createInnerTRPCContext>;

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  const session = await getServerAuthSession({ req, res });

  return createInnerTRPCContext({
    session,
  });
};

import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const getUser = async (ctx: TRPCContext, withCompany: boolean) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const user = await ctx.prisma.user.findUnique({
    where: { id: ctx.session.user.id },
    include: { company: withCompany },
  });

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return user;
};

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  const user = await getUser(ctx, true);

  return next({
    ctx: {
      session: { ...ctx.session, user: user },
    },
  });
});

const enforceUserIsProvider = t.middleware(async ({ ctx, next }) => {
  const user = await getUser(ctx, true);

  if (!user || user.company.type !== "PROVIDER") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: user },
    },
  });
});

const enforceUserProviderAdmin = t.middleware(async ({ ctx, next }) => {
  const user = await getUser(ctx, true);

  if (!user || user.company.type !== "PROVIDER" || user.role !== "ADMIN") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: {
        ...ctx.session,
        user: user,
      },
    },
  });
});

const enforceUserIsAdmin = t.middleware(async ({ ctx, next }) => {
  const user = await getUser(ctx, false);

  if (!user || user.role !== "ADMIN") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: {
        ...ctx.session,
        user: user,
      },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
export const providerProcedure = t.procedure.use(enforceUserIsProvider);
export const adminProviderProcedure = t.procedure.use(enforceUserProviderAdmin);
export const adminProcedure = t.procedure.use(enforceUserIsAdmin);
