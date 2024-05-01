"use client";

import Play from "@/components/Play";
import getDuration from "@/helpers/getDuration";
import useFrame from "@/hooks/(player)/useFrame";
import usePlayer from "@/hooks/(player)/usePlayer";
import useVolume from "@/hooks/(player)/useVolume";
import { cn } from "@/libs/utils";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsRepeat,
} from "react-icons/bs";
import { LiaRandomSolid } from "react-icons/lia";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

interface OptionsProps {
  onNext: () => void;
  onPrev: () => void;
  onPlay: () => void;
  onRandom: () => void;
  onRepeat: () => void;
}
const PlayerAction = () => {
  const {
    list,
    currentSong,
    isPlaying,
    isLoad,
    isFirst,
    typeRepeat,
    isRandom,
    setContinue,
    setLoad,
    setFirst,
    setPrev,
    setNext,
    setRepeat,
    setRandom,
  } = usePlayer();
  const { volume, mute, change } = useVolume();
  const { showFrame } = useFrame();
  const [seconds, setSeconds] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);
  const [loop, setLoop] = useState<boolean>(false);
  const ref = useRef<ReactPlayer>() as MutableRefObject<ReactPlayer>;
  const getBackgroundSize = () => {
    return {
      backgroundSize: `${ref?.current ? seconds * 100 : "0"}% 100%`,
    };
  };
  useEffect(() => {
    if (typeRepeat === 1) setLoop(true);
    else setLoop(false);
  }, [typeRepeat]);
  /* Function */
  const onProgress = (value: OnProgressProps) => {
    if (!seeking && !change) setSeconds(value.played);
  };
  const onNext = () => {
    setNext();
  };
  const onPrev = () => {
    setPrev();
  };

  const onRepeat = () => {
    setRepeat();
  };
  const onRandom = () => {
    setRandom();
  };
  const onPlay = () => {
    setContinue();
  };
  const actions = options({
    onPrev,
    onNext,
    onPlay,
    onRepeat,
    onRandom,
  });
  return (
    <div className="col-span-3 sm:col-span-1 h-20 flex flex-col justify-center py-3">
      {/* Options */}
      <div className="text-white h-full w-full flex gap-4 items-center justify-center">
        {actions.map((action) =>
          action.play ? (
            <div
              onClick={(e) => (e.stopPropagation(), action.onClick())}
              key={action.label}
              className="  hover:text-textPrimary"
            >
              <action.play
                btnPlay={{
                  circle: true,
                  size: action.size,
                  isPlay: isPlaying && !isLoad,
                }}
                className="hover:border-textPrimary hover:bg-transparent"
              />
            </div>
          ) : (
            <div
              key={action.label}
              className={cn(
                action.label === "repeat" &&
                  typeRepeat != 0 &&
                  "text-textPrimary",
                action.label === "random" && isRandom && "text-textPrimary",
                "relative cursor-pointer w-7 h-7 rounded-full hover:bg-playerFocus flex items-center justify-center ",
              )}
              onClick={(e) => (e.stopPropagation(), action.onClick())}
            >
              <action.icon
                size={action.size}
                title={
                  action.label.charAt(0).toUpperCase() + action.label.slice(1)
                }
              />
              {action.label === "repeat" && typeRepeat === 1 && (
                <span className="text-[8px] absolute w-full flex items-center justify-center">
                  1
                </span>
              )}
            </div>
          ),
        )}
      </div>
      {/* Range */}
      <div className="leading-none">
        <ReactPlayer
          ref={ref}
          muted={mute}
          loop={loop}
          volume={volume}
          url={currentSong?.src}
          playing={isPlaying && isFirst && !showFrame}
          onError={(e) => console.log(e)}
          onReady={() => {
            setLoad(false);
            !isFirst && setFirst(true);
          }}
          onEnded={() => {
            if (!loop) setContinue(false);
          }}
          onProgress={onProgress}
          config={{ file: { forceAudio: true } }}
          style={{ display: "none" }}
        />
        <div className="flex items-center gap-2 text-xx text-contentDesc font-semibold tracking-wide">
          <span>
            {ref?.current
              ? getDuration(ref?.current?.getCurrentTime())
              : "00:00"}
          </span>
          <input
            id="player"
            type="range"
            step={"any"}
            min={0}
            max={1}
            value={seconds}
            onMouseDown={() => setSeeking(true)}
            onChange={(e) => ref?.current?.seekTo(parseFloat(e.target.value))}
            onMouseUp={() => setSeeking(false)}
            className="w-full h-[3px] transition bg-contentDesc cursor-pointer "
            style={getBackgroundSize()}
          />
          <span className={cn(currentSong && "text-white")}>
            {currentSong ? currentSong.duration : "NaN:NaN"}
          </span>
        </div>
      </div>
    </div>
  );
};
export default PlayerAction;

const options = ({
  onPrev,
  onNext,
  onPlay,
  onRepeat,
  onRandom,
}: OptionsProps) => [
  {
    icon: LiaRandomSolid,
    label: "random",
    onClick: onRandom,
    size: 22,
  },
  {
    icon: BsFillSkipStartFill,
    label: "prev",
    onClick: onPrev,
    size: 25,
  },
  {
    icon: LiaRandomSolid,
    play: Play,
    label: "play",
    onClick: onPlay,
    size: 27,
  },
  {
    icon: BsFillSkipEndFill,
    label: "next",
    onClick: onNext,
    size: 25,
  },
  {
    icon: BsRepeat,
    label: "repeat",
    onClick: onRepeat,
    size: 22,
  },
];

