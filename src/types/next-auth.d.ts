import type { Company, Role } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      company?: Company;
      role?: Role;
    } & DefaultSession["user"];
  }
}
