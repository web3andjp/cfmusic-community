import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/auth-options'

export async function GET() {
  const session = (await getServerSession(authOptions as any)) as
    | { user?: Record<string, unknown> }
    | null;

  if (!session) {
    return Response.json({ authenticated: false });
  }

  return Response.json({
    authenticated: true,
    user: session.user,
  });
}
