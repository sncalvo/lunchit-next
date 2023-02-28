import type { GetServerSidePropsContext } from "next/types";
import { getServerAuthSession } from "../server/auth";

async function checkLoggedIn(ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) {
  const session = await getServerAuthSession(ctx);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

async function checkAdmin(ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) {
  const session = await getServerAuthSession(ctx);

  if (!session || !session.user || session.user.role !== "ADMIN") {
    // Since user is not admin, redirect to previous page
    return {
      redirect: {
        destination: ctx.req.headers.referer || "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

async function checkProvider(ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) {
  const session = await getServerAuthSession(ctx);

  if (!session || !session.user || session.user.company?.type !== "PROVIDER") {
    // Since user is not provider, redirect to previous page
    return {
      redirect: {
        destination: ctx.req.headers.referer || "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export { checkLoggedIn, checkAdmin, checkProvider };
