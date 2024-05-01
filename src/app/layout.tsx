import { Inter } from "next/font/google";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ToastifyProvider from "@/providers/ToastifyProvider";
import "react-toastify/ReactToastify.css";
import "./globals.css";
import siteMetadata from "@/libs/siteMetaData";
import Header from "./(site)/components/Header";
import Sidebar from "./(site)/components/Sidebar";
import { User } from "@prisma/client";
import getCurrentUser from "@/actions/getCurrentUser";
import LoginModal from "@/models/(header)/LoginModal";
import UploadModal from "@/models/(header)/UploadModal";
import Player from "./(site)/components/Player";

const inter = Inter({ subsets: ["latin"] });
const title = "Music | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV";
const description =
  "Dịch vụ nhạc số với hàng triệu bài hát và MV có bản quyền chất lượng cao, giúp bạn nghe nhạc, tải nhạc, upload và đồng bộ kho nhạc của tôi trên nhiều thiết bị.";
const content = siteMetadata({ title, description });

export const metadata = {
  // metadataBase: new URL(content.siteUrl),
  title: {
    template: `%s | ${content.title}`,
    default: content.title,
  },
  description: content.description,
  openGraph: {
    title: content.title,
    description: content.description,
    url: content.siteUrl,
    siteName: content.title,
    locale: content.locale,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = (await getCurrentUser()) as User;
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <ToastifyProvider>
            <LoginModal />
            <UploadModal />
            <Header currentUser={currentUser} />
            <Sidebar currentUser={currentUser}>{children}</Sidebar>
            <Player />
          </ToastifyProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

