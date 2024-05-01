"use client";

import usePlayer from "@/hooks/(player)/usePlayer";
import songPlaceholder from "@/public/images/uploadSong.webp";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { cn } from "@/libs/utils";
import { BtnPlay, Song } from "../../types";

interface CardProps {
  image?: StaticImageData;
  like?: boolean;
  btnPlay: BtnPlay;
  options?: boolean;
  title?: string;
  desc?: string;
  className: string;
  circle?: boolean;
  onClick?: (e: React.SyntheticEvent) => void;
  data?: Song;
  notFit?: boolean;
  rotate?: boolean;
}
const Card: React.FC<CardProps> = ({
  image,
  btnPlay,
  options,
  title,
  desc,
  className,
  circle,
  onClick,
  notFit,
  rotate,
}) => {
  const { isPlaying, currentSong } = usePlayer();
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div className={cn(notFit ? "" : "w-fit")}>
      <div
        onClick={onClick}
        onMouseEnter={() => setIsOpenModal(true)}
        onMouseLeave={() => setIsOpenModal(false)}
        className={cn(
          " relative overflow-hidden aspect-square",
          className && className,
          circle ? "rounded-full" : "rounded-md ",
          rotate && isPlaying ? "animate-spin-slow " : "",
        )}
      >
        <Image
          alt="Image"
          src={image || songPlaceholder}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className={cn(
            ` aspect-square object-cover  transition-all duration-700 `,
            (isOpenModal || btnPlay?.isPlay || btnPlay?.active) &&
              btnPlay?.show &&
              "outline-none",
            (isOpenModal || btnPlay?.isPlay || btnPlay?.active) &&
              btnPlay?.show &&
              "scale-110",
            (isOpenModal || btnPlay?.isPlay || btnPlay?.active) &&
              btnPlay?.show &&
              "opacity-80",
            circle ? "rounded-full" : "rounded-md ",
          )}
        />
        {(isOpenModal || btnPlay?.isPlay || btnPlay?.active) &&
          btnPlay?.show && (
            <div
              className={cn(
                "absolute inset-0 flex justify-center items-center gap-2 opacity-100 text-white",
                rotate ? "animate-none" : "",
              )}
            ></div>
          )}
      </div>
      <div>
        <h2 className={cn("text-sm font-bold w-fit text-white mt-2")}>
          {title && title}
        </h2>
        <span className={cn("text-xs text-contentDesc")}>{desc && desc}</span>
      </div>
    </div>
  );
};

export default Card;

