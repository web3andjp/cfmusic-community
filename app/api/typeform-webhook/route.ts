import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const answers = body?.form_response?.answers || [];

  const emailAnswer = answers.find((a: any) => a.type === "email");

  if (!emailAnswer?.email) {
    return new Response("Email not found", { status: 400 });
  }

  const email = emailAnswer.email;

  await prisma.user.upsert({
    where: { email },
    update: { registered: true },
    create: { email, registered: true },
  });

  return Response.json({ success: true });
}