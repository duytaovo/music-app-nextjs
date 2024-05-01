"use client";

import usePlayer from "@/hooks/(player)/usePlayer";
import { cn } from "@/libs/utils";
import { Song } from "../../types";
import Artist from "./Artist";
import Card from "./Card";
interface CardContentProps {
  data: Song | undefined;
  height: string;
  width?: string;
  className?: string;
  classNameTitle?: string;
  play?: boolean;
  disabled?: boolean;
  pass?: boolean;
  isStop?: boolean;
  nowrap?: boolean;
  circle?: boolean;
  rotate?: boolean;
}
const CardContent: React.FC<CardContentProps> = ({
  data,
  height,
  width,
  className,
  classNameTitle,
  play,
  disabled,
  pass,
  nowrap,
  circle,
  rotate,
}) => {
  const {
    showPlayer,
    setShowPlayer,
    setPlaying,
    setPlaylist,
    currentSong,
    isPlaying,
    setContinue,
  } = usePlayer();
  return (
    <div className={cn("flex gap-2 ", height)}>
      <Card
        onClick={(e: any) => {
          {
            e.stopPropagation();

            !showPlayer && setShowPlayer(true);
            data?.src === currentSong?.src
              ? setContinue()
              : (setPlaying(data, true), data && setPlaylist(data));
          }
        }}
        btnPlay={{
          isPlay: data?.src === currentSong?.src && isPlaying,
          active: data?.src === currentSong?.src && isPlaying,
          size: 20,
          show: play,
        }}
        data={data}
        image={data?.image}
        className={cn(height, width)}
        circle={circle}
        rotate={rotate}
      />
      <div className={cn("flex flex-col h-full", className)}>
        <span
          className={cn(
            "font-bold w-fit text-[0.78rem] ",
            !pass ? "text-white" : "text-white/50",
            classNameTitle,
            nowrap ? "whitespace-nowrap" : "sm:whitespace-normal",
          )}
        >
          {data?.songName}
        </span>
        <div className="flex  overflow-hidden md:overflow-visible md:flex-wrap gap-[1px]  ">
          {data?.singers.map((singer: any, idx: number) => (
            <Artist
              key={singer}
              singer={idx === data?.singers.length - 1 ? singer : singer + ","}
              disabled={disabled ?? true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default CardContent;

