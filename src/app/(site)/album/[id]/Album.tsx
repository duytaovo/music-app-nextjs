"use client";

import { favorite } from "@/store/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import AlbumCard from "./AlbumCard";
import ListSongs from "@/components/ListSongs";
import usePlayer from "@/hooks/(player)/usePlayer";
import LoadingModal from "@/models/(content)/LoadingModal";
import { cn } from "@/libs/utils";
import { List } from "../../../../../types";
interface AlbumProps {
  params: string;
}
const Album: React.FC<AlbumProps> = ({ params }) => {
  const { showPlayer } = usePlayer();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<List>(favorite.favorite(+params));

  return (
    <>
      {/* {!data && <LoadingModal />} */}
      <section className="h-screen bg-content mt-sidebarHeight overflow-hidden ">
        <div
          className={cn(
            "pt-8  lg:flex gap-10  px-12 overflow-hidden overflow-y-auto",
            showPlayer ? "h-[calc(100vh-70px)]" : "h-screen",
            showPlayer ? "pb-24" : "pb-20",
          )}
        >
          <AlbumCard
            thumbnails={data?.thumbnails}
            active={data?.data.includes(data?.thumbnails?.song)}
          />
          <ListSongs data={data?.data} className="w-full h-fit" />
        </div>
      </section>
    </>
  );
};

export default Album;

