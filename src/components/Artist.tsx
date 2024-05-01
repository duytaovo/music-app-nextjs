"use client";

import useWindowSize from "@/hooks/(utils)/useWindowSize";
import ArtistModal from "@/models/(content)/ArtistModal";
import { StaticImageData } from "next/image";

interface ArtistProps {
  image?: StaticImageData;
  singer: string;
  disabled?: boolean;
}
const Artist: React.FC<ArtistProps> = ({ image, singer, disabled }) => {
  const newSinger = singer?.replace(/[.,]/g, "");
  const { width } = useWindowSize();
  return (
    <span className="w-fit text-xs text-contentDesc hover:underline  ">
      {disabled || (width && width < 768) ? (
        <div className="w-fit focus:outline-none hover:no-underline  cursor-not-allowed ">
          {singer}
        </div>
      ) : (
        <ArtistModal singer={newSinger}>{singer}</ArtistModal>
      )}
    </span>
  );
};
export default Artist;

