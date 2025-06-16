import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { auth } from "@/auth";
import Layout from "@/components/Layout";
import NotificationList from "@/components/NotificationList";
import Navbar from "@/components/navbar";
import AppointmentListMain from "@/components/AppointmentListMain";
import FindADoc from "@/components/FindADoc";

export default async function Home() {
  const session = await auth();

  return (
    <Layout
      user={
        session?.user
          ? { ...session.user, name: session.user.name ?? undefined }
          : undefined
      }
    >
      <main className="grow flex items-center justify-between p-4">
        <Card className="w-2/3" id="finddoc">
            <FindADoc />
        </Card>

        <Card className="w-1/3">
          <AppointmentListMain />
        </Card>

        <div className="notf">
          {session?.user?.role === "doctor" && (
            <NotificationList userId={session.user.id} />
          )}
        </div>
      </main>
    </Layout>
  );
}
