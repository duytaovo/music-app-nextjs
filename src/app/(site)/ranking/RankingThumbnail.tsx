import Artist from "@/components/Artist";
import Card from "@/components/Card";
import Like from "@/components/Like";
import Options from "@/components/Options";
import Play from "@/components/Play";
import usePlayer from "@/hooks/(player)/usePlayer";
import { Song } from "../../../../types";

interface RankingThumbnailProps {
  song: Song | undefined;
}
const RankingThumbnail: React.FC<RankingThumbnailProps> = ({ song }) => {
  const {
    setPlaying,

    isPlaying,
    currentSong,
    setContinue,
  } = usePlayer();
  return (
    /* Card */
    <div className="flex gap-4 lg:flex-col lg:w-64">
      <Card
        btnPlay={{
          isPlay: isPlaying,
          circle: true,
          show: true,
        }}
        onClick={() => setContinue()}
        data={song}
        image={song?.image}
        className="w-46 lg:w-64"
      />
      <div className="w-auto lg:w-64 h-46 lg:h-auto flex flex-col justify-between lg:items-center gap-3">
        <div className="flex flex-col gap-1  w-full lg:items-center">
          <h2 className="text-lg text-center font-bold w-fit text-white">
            {song?.songName || "Title"}
          </h2>
          <div className="w-full flex flex-wrap gap-[1px] lg:justify-center ">
            {song?.singers?.map((singer, idx) => (
              <>
                <Artist
                  key={singer}
                  singer={
                    idx === song?.singers?.length - 1
                      ? singer + "."
                      : singer + ","
                  }
                />
              </>
            ))}
          </div>
          <span className="text-xs text-contentDesc hover:underline  ">
            {song?.favorites
              ? song?.favorites + " người yêu thích"
              : "(Empty) follows"}
          </span>
        </div>
        <div className="flex gap-2 lg:flex-col lg:items-center">
          <div className="flex items-center">
            <div className="h-8 text-white flex  px-4 py-1.5 bg-login items-center justify-center rounded-full hover:opacity-80 cursor-pointer">
              <div
                onClick={() => setContinue()}
                className="flex gap-1 items-center "
              >
                <Play btnPlay={{ isPlay: isPlaying, size: 17, show: true }} />
                <span className="text-xds leading-6 font-medium tracking-wider">
                  TIẾP TỤC PHÁT
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 h-8">
            <div className="w-8 flex rounded-full bg-search items-center justify-center hover:opacity-80 cursor-pointer">
              {" "}
              <Options size={16} className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
    /* List */
  );
};
export default RankingThumbnail;

