import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth-options";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { featureId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) return new Response("User not found", { status: 404 });

  await prisma.featureVote.upsert({
    where: {
      userId_featureId: {
        userId: user.id,
        featureId,
      },
    },
    update: {},
    create: {
      userId: user.id,
      featureId,
    },
  });

  return Response.json({ success: true });
}