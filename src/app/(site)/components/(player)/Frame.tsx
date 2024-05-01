import CardContent from "@/components/CardContent";
import useFrame from "@/hooks/(player)/useFrame";
import usePlayer from "@/hooks/(player)/usePlayer";
import { cn } from "@/libs/utils";
import { HiXMark } from "react-icons/hi2";
import ReactPlayer from "react-player";

const Frame = () => {
  const { currentSong, list, setPlaying, setPlaylist } = usePlayer();
  const { showFrame, setFrame } = useFrame();
  return (
    <div
      className={cn(
        " bottom-0 bg-gradient-to-b from-gray-900 to-gray-600  rounded-md z-50 overflow-hidden transition-all  ease-linear delay-150",
        showFrame ? "fixed" : "",
        showFrame ? " w-full h-full p-5" : "w-0 h-0",
      )}
    >
      <div className="w-full flex justify-end">
        <div
          onClick={() => {
            setFrame(false);
          }}
          className="cursor-pointer h-10 w-10 bg-slate-600 hover:bg-slate-400 rounded-full flex items-center justify-center"
        >
          <HiXMark size={30} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 p-5 overflow-hidden  gap-2 rounded-md bg-slate-600">
        <div className=" lg:col-span-2 aspect-video rounded-md">
          {showFrame && (
            <ReactPlayer
              playing={showFrame}
              height={"100%"}
              width={"100%"}
              onError={(e) => console.log(e)}
              url={`https://www.youtube.com/embed/${currentSong?.link}`}
              controls={true}
              config={{
                youtube: {
                  playerVars: { info: 0 },
                },
              }}
            />
          )}
        </div>
        <div className="lg:col-span-1 h-52 px-20 py-5 lg:py-0 lg:px-0 lg:h-5/6 overflow-hidden overflow-y-auto bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-md">
          {list?.map((song) => (
            <div
              onClick={(e) => {
                {
                  e.stopPropagation();
                  setPlaying(song, false), setPlaylist(song);
                }
              }}
              key={song.src}
              className={cn(
                "px-2 py-2  rounded-md cursor-pointer ",
                currentSong?.src === song.src
                  ? "bg-login"
                  : "hover:bg-login/40",
              )}
            >
              <CardContent
                isStop={true}
                play
                disabled
                data={song}
                height="h-9"
                className={cn(
                  currentSong?.src === song.src && "overflow-hidden",
                )}
                classNameTitle={cn(
                  "whitespace-nowrap ",
                  currentSong?.src === song.src && "animate-run ",
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Frame;

