"use client";

import usePlayer from "@/hooks/(player)/usePlayer";
import RankingModal from "@/models/(content)/RankingModal";
import { IconType } from "react-icons";
import Artist from "./Artist";
import Card from "./Card";
import { cn } from "@/libs/utils";
import { Song } from "../../types";
interface RankingCardProps {
  options: IconType;
  className: string;
  data?: Song;
  active?: boolean;
}
const RankingCard: React.FC<RankingCardProps> = ({
  options: Options,
  className,
  data,
  active,
}) => {
  const {
    isPlaying,
    showPlayer,
    currentSong,
    setShowPlayer,
    setContinue,
    setPlaying,
    setPlaylist,
  } = usePlayer();
  return (
    <div
      className={cn(
        "flex justify-between p-2 rounded-md group ",
        className,
        active ? "bg-sidebarActive" : "hover:bg-sidebarActive ",
      )}
    >
      <div className="flex gap-2">
        <Card
          onClick={(e) => {
            {
              e.stopPropagation();
              data?.src === currentSong?.src
                ? setContinue()
                : (setPlaying(data, true), data && setPlaylist(data));
              !showPlayer && setShowPlayer(true);
            }
          }}
          data={data}
          btnPlay={{
            show: true,
            active: active,
            isPlay: isPlaying && active,
          }}
          image={data?.image}
          className="
                w-14 h-14"
        />
        <div className="flex flex-col gap-1">
          <h2 className="text-xds whitespace-nowrap sm:whitespace-normal text-clip text-white font-bold">
            {data?.songName}
          </h2>
          <span className="text-xx text-contentDesc flex flex-wrap gap-[1px] ">
            {data?.singers.map((singer, idx) => (
              <Artist
                key={singer}
                singer={
                  idx === data?.singers.length - 1 ? singer : singer + ","
                }
              />
            ))}
          </span>
        </div>
      </div>

      <div className="h-full flex items-center opacity-0 group-hover:opacity-100">
        <RankingModal image={data?.image} song={data}>
          <div className="flex  items-center justify-center font-medium cursor-pointer w-9 h-9 rounded-full hover:bg-slate-100/20">
            {" "}
            <Options size={18} />
          </div>
        </RankingModal>
      </div>
    </div>
  );
};
export default RankingCard;

