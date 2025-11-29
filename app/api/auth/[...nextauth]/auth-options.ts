import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import Resend from "next-auth/providers/resend";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      from: process.env.EMAIL_FROM!, // e.g. community@cfmusic.org
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  }
};