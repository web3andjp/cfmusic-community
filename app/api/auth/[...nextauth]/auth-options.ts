import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM!,  // e.g. community@cfmusic.org

      sendVerificationRequest: async ({ identifier, url }) => {
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