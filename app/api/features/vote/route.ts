import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth-options";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();

  let userId: string | null = null;

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    userId = user?.id || null;
  } else if (body.guestId) {
    userId = `guest-${body.guestId}`;
  } else {
    return new Response("Unauthorized", { status: 401 });
  }

  await prisma.featureVote.upsert({
    where: {
      userId_featureId: {
        userId,
        featureId: body.featureId,
      },
    },
    update: {},
    create: {
      userId,
      featureId: body.featureId,
    },
  });

  return Response.json({ success: true });
}