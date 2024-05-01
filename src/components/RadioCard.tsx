"use client";
import Image from "next/image";
import CircularSlider from "@fseehawer/react-circular-slider";
import Card from "./Card";
import useCircleSlider from "@/hooks/(content)/useCircleSlider";
import { useCallback, useEffect, useState } from "react";
import useResizeObserver from "@/hooks/(utils)/useResizeObserver";
import live from "@/public/images/sidebar/live.svg";
import bmw from "@/public/bmw.jpg";
import usePlayer from "@/hooks/(player)/usePlayer";
import { cn } from "@/libs/utils";
import { Song } from "../../types";
interface RadioCardProps {
  song: Song;
}

const RadioCard: React.FC<RadioCardProps> = ({ song }) => {
  const {
    isPlaying,
    currentSong,
    showPlayer,
    setContinue,
    setPlaying,
    setPlaylist,
    setShowPlayer,
  } = usePlayer();
  const { setWidth } = useCircleSlider();
  const onResize = useCallback((target: HTMLDivElement) => {
    setWidth();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ref = useResizeObserver(onResize);
  return (
    <div className="w-full flex flex-col gap-1 ">
      {/* Image */}
      <div ref={ref} id="card" className="relative w-full rounded-full">
        <div className="relative">
          <Card
            image={song?.image}
            btnPlay={{}}
            className={cn(
              "w-full",
              song.src === currentSong?.src
                ? "shadow-2xl shadow-[#ff4b4a] opacity-90"
                : "",
            )}
            circle
            notFit
          />
        </div>
        <div className="absolute left-0 top-0">
          {" "}
          <CircleSlider />
        </div>
        <div className="w-full h-full absolute left-0 top-0">
          {" "}
          <div className="w-full h-full flex items-end justify-center ">
            <Image
              alt={"Live"}
              src={live as string | ""}
              width={38}
              height={17}
              className="absolute bottom-0 left-1/3   ml-2 hidden lg:inline-flex opacity-100 z-10 "
            />
          </div>
          <div className="absolute right-0 bottom-0 -translate-y-1/translate-x-1/4 z-10 shadow-lg  ">
            <Card
              image={song.image || bmw}
              onClick={(e) => {
                e.stopPropagation(),
                  song?.src === currentSong?.src
                    ? setContinue()
                    : (setPlaying(song), song && setPlaylist(song)),
                  !showPlayer && setShowPlayer(true);
              }}
              data={song}
              btnPlay={{
                show: true,
                active: song.src === currentSong?.src,
                isPlay: isPlaying && song.src === currentSong?.src,
              }}
              className={cn(
                "border-2 border-fuchsia-600 transition-all duration-500 sha",
                song.src === currentSong?.src ? "w-14" : "w-11",
              )}
              circle
              notFit={true}
            />
          </div>
        </div>
      </div>
      {/* Info */}
      <div className="flex flex-col w-full items-center">
        <div className="flex flex-col items-center gap-0.5 text-white">
          <h2 className="text-sm font-semibold whitespace-nowrap text-clip">
            {song.singers[0]}
          </h2>
          <span className="text-xs text-contentDesc ">{song.favorites}</span>
        </div>
      </div>
    </div>
  );
};

const CircleSlider = () => {
  const { width } = useCircleSlider();
  return (
    <CircularSlider
      dataIndex={Math.floor(Math.random() * 360)}
      width={width}
      progressColorFrom="#ff4b4a"
      progressColorTo="#ff4b4a"
      progressSize={4}
      trackColor="#ffffff33"
      trackSize={4}
      hideKnob
      hideLabelValue
    />
  );
};
export default RadioCard;

