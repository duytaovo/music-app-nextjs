"use client";

import CardContent from "@/components/CardContent";
import OptionContent from "@/components/OptionContent";
import usePlayer from "@/hooks/(player)/usePlayer";

const PlayerCard = () => {
  const { currentSong } = usePlayer();
  return (
    <div className="col-span-1 h-20 flex gap-5 items-center justify-between pr-10  ">
      <CardContent
        height="h-14"
        data={currentSong}
        className="justify-center overflow-hidden w-28  hidden md:flex"
        classNameTitle="animate-run whitespace-nowrap "
        play
        disabled={true}
        nowrap={true}
        circle={true}
        rotate={true}
      />
      <div className="hidden lg:flex gap-2 items-center ">
        <OptionContent
          image={currentSong?.image}
          like={currentSong?.favorites}
          size={20}
          className="w-8 h-8 hover:bg-playerFocus"
          song={currentSong}
        />
      </div>
    </div>
  );
};
export default PlayerCard;

