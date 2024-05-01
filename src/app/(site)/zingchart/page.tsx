import ZingChart from "@/app/(site)/zingchart/ZingChart";

export const metadata = {
  title: "ZingChart | Xem bài hát, album, MV đang hot nhất hiện tại",
};

export default function Home() {
  return (
    <main className="h-screen flex-1  flex-col overflow-hidden">
      <ZingChart />
    </main>
  );
}

