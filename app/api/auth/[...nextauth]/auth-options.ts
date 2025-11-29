import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";

//
// TEMP DEV LOGIN PROVIDER
//
const DevProvider = CredentialsProvider({
  id: "dev",
  name: "Dev Login",
  credentials: {
    pass: { label: "Dev Password", type: "password" }, // unused, but required
  },
  async authorize() {
    const email = "dev@cfmusic.org";

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: "Dev User",
        },
      });
    }

    return user;
  },
});

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    // TEMP PROVIDER
    DevProvider,

    //
    // REAL EMAIL PROVIDER
    //
    EmailProvider({
      from: process.env.EMAIL_FROM!,
      sendVerificationRequest: async ({ identifier, url }) => {
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