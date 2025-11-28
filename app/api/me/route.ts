import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth-options";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ authenticated: false });
  }

  return Response.json({
    authenticated: true,
    user: session.user,
  });
}