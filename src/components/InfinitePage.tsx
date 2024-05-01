"use client";
import usePlayer from "@/hooks/(player)/usePlayer";
import { useInView } from "@/hooks/(utils)/useInView";
import { User } from "@prisma/client";
import { ElementRef, useEffect, useRef, useState } from "react";
import CardContent from "./CardContent";
import OptionContent from "./OptionContent";
import { cn } from "@/libs/utils";
import { Song } from "../../types";

interface InfinitePageProps {
  data: Song[][];
  className?: string;
  currentUser?: User | undefined;
  like?: boolean;
  fetchNextPage: () => void;
  root: any;
}
const InfinitePage: React.FC<InfinitePageProps> = ({
  data,
  like,
  fetchNextPage,
  root,
}) => {
  const ref = useRef<ElementRef<"div">>(null);
  const { isIntersecting } = useInView(ref, {
    root: root.current!,
    threshold: 1,
    rootMargin: "300px",
  });
  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
    }
  }, [isIntersecting, fetchNextPage]);

  const [isOpen, setIsOpen] = useState(-1);

  const {
    showPlayer,
    setShowPlayer,
    setPlaying,
    setPlaylist,
    currentSong,
    setContinue,
  } = usePlayer();

  return (
    <div className={cn("w-full")}>
      <div className="flex flex-col ">
        <div className="text-xx text-contentDesc uppercase font-semibold text-left flex justify-between  lg:px-2 pb-2">
          <span>Bài hát</span>
          <span>Thời gian</span>
        </div>
        <div className="flex flex-col ">
          {data?.map((songs) => {
            return songs.map((song, idx) => {
              return (
                <div
                  ref={idx === songs.length - 1 ? ref : null}
                  onClick={(e) => (
                    e.stopPropagation(),
                    song?.src === currentSong?.src
                      ? setContinue()
                      : (setPlaying(song), song && setPlaylist(song)),
                    !showPlayer && setShowPlayer(true)
                  )}
                  onMouseEnter={() => setIsOpen(idx)}
                  onMouseLeave={() => setIsOpen(-1)}
                  key={song.songName}
                  className={cn(
                    "grid grid-cols-4 md:grid-cols-3 border-t rounded-md border-contentDesc/10  px-2 py-2 group hover:bg-sidebarActive cursor-pointer ",
                    song.src === currentSong?.src && "bg-sidebarActive",
                  )}
                >
                  <div className="col-span-3 md:col-span-2 overflow-hidden sm:overflow-visible">
                    <CardContent
                      play
                      data={song}
                      width="w-9"
                      height="h-9"
                      nowrap={true}
                      disabled={false}
                    />
                  </div>
                  <div
                    className={cn(
                      "flex items-center",
                      like ? " justify-between" : "justify-end",
                    )}
                  >
                    <div className="flex items-center">
                      {isOpen !== idx && (
                        <div className="text-contentDesc text-xx font-semibold lg:px-2 flex items-center justify-end ">
                          {"0" + song.duration}
                        </div>
                      )}
                      {isOpen === idx && (
                        <OptionContent
                          image={song?.image}
                          like={song?.favorites}
                          className="w-9 h-9"
                          size={20}
                          song={song}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};
export default InfinitePage;

