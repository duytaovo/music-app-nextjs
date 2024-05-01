import getCurrentUser from "@/actions/getCurrentUser";
import Uploaded from "./Uploaded";
import { User } from "@prisma/client";

export const metadata = {
  title: "Uploaded | Xem bài hát, album, MV đang hot nhất hiện tại",
};

export default async function Home() {
  const currentUser = (await getCurrentUser()) as User;

  return (
    <main className="h-screen flex-1  flex-col overflow-hidden">
      <Uploaded currentUser={currentUser} />
    </main>
  );
}

