import { getServerSession } from "next-auth";
import  {authOptions}  from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ClientLayout from "../client-layout";

export default async function homeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log("checking session", session);

  if (!session) {
    return redirect("/login"); // 👈 protect this layout
  }

  return( 
   <html lang="en">
        <body>
         <ClientLayout>{children}</ClientLayout>
        </body>
      </html>);
}