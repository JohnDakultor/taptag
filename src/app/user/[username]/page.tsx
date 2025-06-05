// src/app/u/[username]/page.tsx
import { notFound } from "next/navigation";
import { getUserByUsername } from "@/lib/user";
import PublicPreview from "@/components/ui/public-preview"; // Move out of route dir

export default async function PublicPreviewPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // Await params before destructuring
 
  const user = await getUserByUsername((await params).username);

  if (!user) {
    notFound();
  }

  return <PublicPreview userId={user.id} />;
}
