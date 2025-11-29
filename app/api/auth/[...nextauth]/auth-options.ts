import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    // MAGIC LINK LOGIN
    EmailProvider({
      from: process.env.EMAIL_FROM!,
      sendVerificationRequest: async ({ identifier, url }) => {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY!);

        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: identifier,
          subject: "Your Campfire Login Link",
          html: `
            <div style="font-family: sans-serif; font-size: 16px;">
              <p>Click the link below to sign in:</p>
              <p><a href="${url}">Sign in to Campfire</a></p>
            </div>
          `,
        });
      },
    }),

    // GUEST LOGIN (NO PASSWORD REQUIRED)
    CredentialsProvider({
      name: "Guest Login",
      credentials: {},

      async authorize() {
        const email = "guest@cfmusic.org";

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              name: "Guest User",
              image: null,
              registered: false,
            },
          });
        }

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    // Attach data to the JWT
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.registered = user.registered ?? false;
      }
      return token;
    },

    // Expose it in the session
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        session.user.registered = token.registered as boolean;
      }
      return session;
    },
  },
};