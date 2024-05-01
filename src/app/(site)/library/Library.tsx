"use client";

import usePlayer from "@/hooks/(player)/usePlayer";
import LibraryCard from "./LibraryCard";
import EmptyState from "@/components/EmptyState";
import { cn } from "@/libs/utils";
import ListSongs from "@/components/ListSongs";
const Library = () => {
  const { list, showPlayer, currentSong } = usePlayer();

  return (
    <>
      <section className="h-screen bg-content mt-sidebarHeight overflow-hidden ">
        <div
          className={cn(
            "pt-8  lg:flex gap-10  px-12 overflow-hidden overflow-y-auto",
            showPlayer ? "h-[calc(100vh-70px)]" : "h-screen",
            showPlayer ? "pb-24" : "pb-20",
          )}
        >
          {!currentSong && list.length === 0 ? (
            <EmptyState
              text={"Hiện tại bạn chưa nghe bài hát nào cả."}
              home={true}
            />
          ) : (
            <>
              <LibraryCard />
              <ListSongs data={list} className="w-full h-fit" />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Library;

