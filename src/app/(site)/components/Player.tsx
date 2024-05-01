"use client";

import usePlayer from "@/hooks/(player)/usePlayer";
import { cn } from "@/libs/utils";
import Frame from "./(player)/Frame";
import PlayerAction from "./(player)/PlayerAction";
import PlayerCard from "./(player)/PlayerCard";
import PlayerOptions from "./(player)/PlayerOptions";
("./(player)/PlayerAction");
const Player = () => {
  const { showPlayer } = usePlayer();
  return showPlayer ? (
    <>
      <div
        className={cn(
          "transition-all ease-linear  delay-150 h-20 w-full fixed bottom-0 bg-playerBackground px-4 z-10",
        )}
      >
        <div className=" h-full grid grid-cols-5 sm:grid-cols-3 ">
          <PlayerCard />
          <PlayerAction />
          <PlayerOptions />
        </div>
      </div>
      {/* Frame */}
      <Frame />
    </>
  ) : (
    <></>
  );
};

export default Player;

