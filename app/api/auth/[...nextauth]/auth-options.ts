// app/api/auth/[...nextauth]/auth-options.ts
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM!,
      async sendVerificationRequest({ identifier, url }) {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY!)
        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: identifier,
          subject: 'Your Campfire Login Link',
          html: `<div style="font-family: sans-serif; font-size: 16px;">
              <p>Click the link below to sign in:</p>
              <p><a href="${url}">Sign in to Campfire</a></p>
            </div>`,
        })
      },
    }),
    CredentialsProvider({
      name: 'Guest Login',
      credentials: {},
      async authorize() {
        const user = await prisma.user.upsert({
          where: { email: 'guest@cfmusic.org' },
          update: {},
          create: { email: 'guest@cfmusic.org', name: 'Guest User', registered: false },
        })
        return user
      },
    }),
  ],
  session: { strategy: 'jwt' as const },
  pages: { signIn: '/auth/signin' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
        // cast user to any because registered is not in NextAuth’s base type
        token.registered = (user as any).registered ?? false
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        email: token.email as string,
        registered: token.registered as boolean,
      }
      return session
    },
  },
}
