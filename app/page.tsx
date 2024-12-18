import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { auth } from "@/auth";
import Layout from "@/components/Layout";
import NotificationList from "@/components/NotificationList";

export default async function Home() {
  const session = await auth();

  return (
    <Layout user={session?.user} >
      <main className="grow flex items-center justify-center p-4">
        <Card className="max-w-sm">
          <CardHeader>
            <Image
              className="rounded-lg"
              src="https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="A welcoming image for the homepage"
              width={500}
              height={500}
              priority
            />
          </CardHeader>
          <CardContent>
            <CardTitle className="mb-2 text-2xl font-bold">
              Welcome, {session?.user?.name}!
            </CardTitle>
            <p className="text-muted-foreground">
              If you are learning something valuable from this video, please
              like and subscribe to my channel.
            </p>
          </CardContent>
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