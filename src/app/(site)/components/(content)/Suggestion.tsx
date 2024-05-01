/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Artist from "@/components/Artist";
import getClassName from "@/helpers/getClassName";
import useBreakpoint from "@/hooks/(utils)/useBreakpoint";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "../../../../components/Card";

import { typeMusic } from "@/actions/getSongs";
import getBreakpoint from "@/helpers/getBreakpoint";
import useSong from "@/hooks/(data)/useSong";
import usePlayer from "@/hooks/(player)/usePlayer";
import { favorite } from "@/store/queryKeys";
import useList from "@/hooks/(data)/useList";
import useNavigation from "@/hooks/(utils)/useNavigation";
import { cn } from "@/libs/utils";
import { Song, Thumbnail } from "../../../../../types";
import Loading from "@/components/Loading";

interface ContentProps {
  isLoading: boolean;
  item: number;
  className: string;
  thumbnails: Thumbnail[] | undefined;
}

const title = "Có thể bạn muốn nghe";
const Suggestion = () => {
  const breakpoints = getBreakpoint([1, 2, 3, 4, 5, 5]);
  const className = getClassName(breakpoints);
  const item = useBreakpoint(breakpoints);
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>();
  /* React query */
  const { isLoading, data } = useSong(
    favorite.favorites,
    typeMusic[Math.round(Math.random() * 3)],
  );
  const { getFavoriteList } = useList();
  useEffect(() => {
    if (data) {
      const list = getFavoriteList(favorite.favorites, data as Song[], item);
      if (list) setThumbnails(list as Thumbnail[]);
    }
  }, [item, isLoading, data]);
  return (
    <div className="flex flex-col gap-y-5 ">
      <div className="flex justify-between">
        {" "}
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <Content
          isLoading={isLoading}
          item={item}
          className={className}
          thumbnails={thumbnails}
        />
      )}
    </div>
  );
};
export default Suggestion;

function Content({ className, thumbnails }: ContentProps) {
  const { showPlayer, setShowPlayer, setPlaying, setPlaylist } = usePlayer();
  const router = useRouter();
  const { setNavigation } = useNavigation();
  console.log(thumbnails)
  return (
    <div className={cn(className)}>
      {thumbnails?.map((thumbnail, index) => (
        <div className="" key={thumbnail.favorites}>
          <Card
            onClick={() => {
              setNavigation(() => router.push(`album/${index + 1}`));
              setPlaying(thumbnail.song);
              setPlaylist(thumbnail.song);
              !showPlayer && setShowPlayer(true);
            }}
            like
            btnPlay={{ circle: true, show: true }}
            image={thumbnail.image}
            title={thumbnail.title}
            className="  
               w-36 h-36
               md:w-40 md:h-40
               lg:w-44 lg:h-44
               xl:w-46 xl:h-46
               2xl:w-46 2xl:h-46"
          />
          <div
            className="flex flex-wrap gap-[1px]    w-36 
               md:w-40 
               lg:w-44 
               xl:w-46 
             2xl:w-46 "
          >
            {thumbnail.singers?.map((singer, idx) => (
              <>
                <Artist
                  key={singer}
                  singer={
                    idx === thumbnail.singers.length - 1
                      ? singer + "..."
                      : singer + ","
                  }
                />
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

