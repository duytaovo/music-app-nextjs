"use client";

import RankingModal from "@/models/(content)/RankingModal";
import { cn } from "@/libs/utils";
import { StaticImageData } from "next/image";
import Options from "./Options";
import { Song } from "../../types";
interface OptionContentProps {
  image?: StaticImageData;
  like?: string | number;
  size?: number;
  className?: string;
  song?: Song;
}
const OptionContent: React.FC<OptionContentProps> = ({
  image,
  like,
  size,
  className,
  song,
}) => {
  return (
    <div>
      <RankingModal image={image} like={like} song={song}>
        <div
          className={cn(
            "items-center justify-center font-medium cursor-pointer w-9 h-9 rounded-full h  flex",
          )}
        >
          {" "}
          <Options size={size ? size : 16} className={className} />{" "}
        </div>
      </RankingModal>
    </div>
  );
};
export default OptionContent;

