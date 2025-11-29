import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM!,

      sendVerificationRequest: async ({ identifier, url }) => {
        // ⛔ DO NOT import Resend at the top-level
        // ✅ SAFE: dynamic import inside the function
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY!);

        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: identifier,
          subject: "Your Campfire login link",
          html: `
            <div style="font-family: sans-serif; font-size: 16px;">
              <p>Click the link below to sign in:</p>
              <p><a href="${url}">Sign in to Campfire</a></p>
            </div>
          `,
        });
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
  },
};