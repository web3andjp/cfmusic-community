import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth-options";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { title, description } = await req.json();

  const feature = await prisma.featureRequest.create({
    data: {
      title,
      description,
      createdBy: { connect: { email: session.user.email } },
    },
  });

  return Response.json(feature);
}

export async function GET() {
  const features = await prisma.featureRequest.findMany({
    include: {
      votes: true,
      createdBy: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(features);
}