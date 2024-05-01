import Ranking from "./Ranking";

export const metadata = {
  title: "Mới phát hành | Xem bài hát, album, MV đang hot nhất hiện tại",
};

export default function Home() {
  return (
    <main className="h-screen flex-1  flex-col overflow-hidden">
      <Ranking />
    </main>
  );
}

