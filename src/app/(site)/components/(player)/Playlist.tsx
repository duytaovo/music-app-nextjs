import CardContent from "@/components/CardContent";
import usePlayer from "@/hooks/(player)/usePlayer";
import { cn } from "@/libs/utils";
import { useEffect, useRef } from "react";

const Playlist = () => {
  const { currentSong, list, setContinue, setPlaying, setPlaylist } =
    usePlayer();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentSong]);
  return (
    <div className=" h-[calc(100vh-90px-70px)] overflow-hidden  overflow-y-auto">
      {list?.map((song, idx) => (
        <div
          ref={song.src === currentSong?.src ? ref : null}
          onClick={(e) => {
            {
              e.stopPropagation();
              song.src === currentSong?.src
                ? setContinue()
                : (setPlaying(song, true), song && setPlaylist(song));
            }
          }}
          key={song.link}
          className={cn(
            "px-2 py-2  rounded-md cursor-pointer ",
            currentSong?.src === song.src ? "bg-login" : "hover:bg-[#40384D]",
          )}
        >
          <CardContent
            play
            disabled
            data={song}
            height="h-9"
            classNameTitle="whitespace-nowrap text-clip"
          />
        </div>
      ))}
    </div>
  );
};
export default Playlist;

