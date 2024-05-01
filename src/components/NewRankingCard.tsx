"use client";

import Card from "./Card";
import Artist from "./Artist";
import usePlayer from "@/hooks/(player)/usePlayer";
import { cn } from "@/libs/utils";
import { Song } from "../../types";
interface NewRankingCardProps {
  rank: number;
  song: Song;
}
const NewRankingCard: React.FC<NewRankingCardProps> = ({ rank, song }) => {
  const {
    currentSong,
    isPlaying,
    showPlayer,
    setShowPlayer,
    setPlaying,
    setContinue,
    setPlaylist,
  } = usePlayer();
  return (
    <div className=" w-full h-full bg-sidebarActive  rounded-md p-3 flex items-center ">
      <div className="w-full  flex gap-2 h-28">
        {/* Image */}
        <div className="w-28 h-28 rounded-md overflow-hidden">
          <Card
            btnPlay={{
              isPlay: song?.src === currentSong?.src && isPlaying,
              active: song?.src === currentSong?.src,
              show: true,
            }}
            onClick={(e) => {
              {
                e.stopPropagation();

                !showPlayer && setShowPlayer(true);
                song?.src === currentSong?.src
                  ? setContinue()
                  : (setPlaying(song, true), song && setPlaylist(song));
              }
            }}
            data={song}
            image={song?.image}
            className="w-28 h-28"
          />
        </div>
        {/* Info */}
        <div className="flex flex-col w-[calc(100%-126px)] justify-between items-start">
          {/* Artist info */}
          <div className=" hidden sm:flex  flex-col gap-1 text-white overflow-hidden">
            <h2
              className={cn(
                "text-xds font-semibold text-clip  ",
                song?.src === currentSong?.src && isPlaying && "animate-run",
              )}
            >
              {song?.songName}
            </h2>
            <span className="text-xx text-contentDesc">
              {song?.singers.map((singer, idx) => (
                <Artist
                  key={singer}
                  singer={
                    idx === song?.singers.length - 1 ? singer : singer + ","
                  }
                />
              ))}
            </span>
          </div>
          {/* Ranking */}
          <div className="w-full gap-2 flex justify-between">
            <h2 className="text-4xl font-roboto font-bold drop-shadow-sm shadow-contentDesc">
              #{rank}
            </h2>
            <span className="hidden md:flex text-xds text-contentDesc font-semibold  items-end pb-[3px]">
              01.01.2024
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewRankingCard;

