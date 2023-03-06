import NextAuth, { type NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        const prismaUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
          include: {
            company: true,
          },
        });
        session.user.company = prismaUser?.company;
        session.user.role = prismaUser?.role;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: env.AUTH0_CLIENT_ID,
      clientSecret: env.AUTH0_CLIENT_SECRET,
      issuer: env.AUTH0_ISSUER,
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      server: {
        host: env.MAIL_SERVER,
        port: parseInt(env.MAIL_PORT),
        secure: env.MAIL_SECURE,
        auth: {
          user: env.MAIL_USER,
          pass: env.MAIL_PASS,
        },
      },
      from: env.EMAIL_FROM,
    }),
  ],
};

export default NextAuth(authOptions);
