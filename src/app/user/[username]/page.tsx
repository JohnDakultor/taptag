// src/app/u/[username]/page.tsx
import { notFound } from "next/navigation";
import { getUserByUsername } from "@/lib/user";
import PublicPreview from "@/components/ui/public-preview"; // Move out of route dir

export default async function PublicPreviewPage({
  params,
}: {
  params: { username: string };
}) {
  // Await params before destructuring
  const awaitedParams = await params;
  const user = await getUserByUsername(awaitedParams.username);

  if (!user) {
    notFound();
  }

  return <PublicPreview userId={user.id} />;
}
