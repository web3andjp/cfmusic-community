// app/api/features/route.ts
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/auth-options'

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions as any)) as
    | { user?: { email?: string } }
    | null
  const body = await req.json()

  let userId: string | null = null

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })
    userId = user?.id || null
  } else if (body.guestId) {
    userId = `guest-${body.guestId}`
  } else {
    return new Response('Unauthorized', { status: 401 })
  }

  const feature = await prisma.featureRequest.create({
    data: { title: body.title, description: body.description, createdById: userId },
  })
  return Response.json(feature)
}

export async function GET() {
  const features = await prisma.featureRequest.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return Response.json(features)
}
