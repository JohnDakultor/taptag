// // src/app/u/[username]/page.tsx
// import { notFound } from "next/navigation";
// import { getUserById } from "@/lib/user";
// import PublicPreview from "@/components/ui/public-preview"; // Move out of route dir

// export default async function PublicPreviewPage({
//   params,
// }: {
//   params: Promise<{ username: string }>;
// }) {
//   // Await params before destructuring
 
//   const user = await getUserById((await params).username);

//   if (!user) {
//     notFound();
//   }

//   return <PublicPreview userId={user.id} />;
// }

// src/app/public-portfolio/[id]/page.tsx
import { notFound } from "next/navigation";
import { PrismaClient } from "@/generated/prisma";
import PublicPreview from "@/components/ui/public-preview";

const prisma = new PrismaClient();

export default async function PublicPreviewPage({
  params,
}: {
  params: { id: string };
}) {
  const keyValue = params.id;

  const key = await prisma.key.findUnique({
    where: { value: keyValue },
    include: {
      user: true,
    },
  });

  if (!key || !key.user || !key.activated) {
    return notFound();
  }

  return <PublicPreview userId={key.user.id} />;
}
