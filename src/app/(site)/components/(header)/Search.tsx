"use client";
import CardContent from "@/components/CardContent";
import useInput from "@/hooks/(data)/useInput";
import useSearch from "@/hooks/(header)/useSearch";
import usePlayer from "@/hooks/(player)/usePlayer";
import useDebounce from "@/hooks/(utils)/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineRise } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { BiLoaderCircle } from "react-icons/bi";
import { cn } from "@/libs/utils";
import { Song } from "../../../../../types";
import { artist } from "@/store/queryKeys";
interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const queryClient = useQueryClient();
  const [songs, setSongs] = useState<Song[] | undefined>(undefined);
  const [value, setValue] = useState<string | undefined>(undefined);
  const debounce = useDebounce(value, 500);
  const { isLoading, data } = useInput(artist.artist(debounce?.trim()));
  const { showSearch, setShowSearch } = useSearch();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setSongs(queryClient.getQueryData(artist.artist(debounce)));
  }, [debounce, data, queryClient]);

  return (
    <div
      className={cn(
        "relative  sm:w-60 md:w-80 lg:w-90 xl:w-100 rounded-full  bg-search h-9",
        showSearch ? "fixed top-[15px] w-72" : "w-40",
      )}
    >
      <div
        className={cn(
          "absolute w-full ",
          showSearch && "bg-searchFocus",
          showSearch ? "h-auto" : "h-9",
          showSearch && "rounded-2xl",
        )}
      >
        {/* /// Layout */}
        {showSearch && (
          <div
            onClick={() => setShowSearch(false)}
            className="fixed inset-0 bg-black bg-opacity-25"
          />
        )}
        {/* /// Icon */}

        <div className={cn(showSearch ? "relative z-10" : "z-0")}>
          <div>
            <div
              className={cn(
                "absolute left-2 top-0   w-9 h-9 text  flex items-center justify-center",
                isLoading && showSearch && "animate-spin duration-150",
              )}
            >
              {isLoading && showSearch ? (
                <BiLoaderCircle size={25} />
              ) : (
                <IoSearchOutline size={25} />
              )}
            </div>
            <div className=" h-9 w-full  pl-10 pr-8 ">
              <form className="h-9' w-full flex items-center pl-2">
                <input
                  autoComplete="off"
                  id="search"
                  onFocus={(e) => {
                    e.stopPropagation();
                    setShowSearch(true);
                  }}
                  onChange={(e) => onChange(e)}
                  type="text"
                  placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                  className={cn(
                    "w-full h-9  focus:outline-none s text-xds placeholder:text-contentDesc/25 placeholder:text-xds",
                    showSearch ? "bg-[#27193B]" : "bg-search",
                  )}
                />
              </form>
            </div>
          </div>
          <Result
            songs={songs}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
          />
        </div>
      </div>
    </div>
  );
};
export default Search;

function Suggestions() {
  const suggestions = [
    {
      icon: AiOutlineRise,
      label: "có ai hẹn hò cùng em chưa",
    },
    { icon: AiOutlineRise, label: "mưa tháng sáu" },
    { icon: AiOutlineRise, label: "cô ấy của anh ấy" },
    { icon: AiOutlineRise, label: "ngày mai người ta lấy chồng" },
    { icon: AiOutlineRise, label: "kẻ viết ngôn tình" },
    { icon: AiOutlineRise, label: "hoa cỏ lau" },
  ];
  return suggestions.map((suggestion) => (
    <div
      key={suggestion.label}
      className=" flex px-[10px] py-[8px] gap-2 items-center rounded-md hover:bg-[#493961]"
    >
      <div className="h-3 w-3">
        {" "}
        <suggestion.icon size={16} />
      </div>
      <span className="text-xds line-clamp-1">{suggestion.label}</span>
    </div>
  ));
}

function Songs({
  songs,
  setShowSearch,
}: {
  songs: Song[];
  setShowSearch: (value: boolean) => void;
}) {
  const {
    showPlayer,
    setShowPlayer,
    setPlaying,
    setPlaylist,
    currentSong,
    setContinue,
  } = usePlayer();
  return songs.map((song) => (
    <div
      key={song.src}
      onClick={(e) => {
        {
          e.stopPropagation();
          !showPlayer && setShowPlayer(true);
          song?.src === currentSong?.src
            ? setContinue()
            : (setPlaying(song, true), song && setPlaylist(song));
          setShowSearch(false);
        }
      }}
      className="cursor-pointer flex px-[10px] py-[8px] gap-2 items-center rounded-md hover:bg-[#493961] w-"
    >
      <CardContent
        play
        data={song}
        width="w-12"
        height="h-12"
        disabled
        nowrap={true}
      />
    </div>
  ));
}
const Result = ({
  songs,
  showSearch,
  setShowSearch,
}: {
  songs: Song[] | undefined;
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
}) => {
  return (
    <div
      className={cn(
        "w-full transition overflow-hidden duration-150 delay-150 px-[13px] py-[10px]",
      )}
    >
      <div
        className={cn(
          "flex flex-col overflow-hidden  text-sm",
          showSearch ? "" : "w-0 h-0",
        )}
      >
        <label className="text-xds font-bold pb-2 text-white">
          Đề xuất cho bạn
        </label>
        <div className="flex flex-col g-3  max-h-96 overflow-hidden overflow-y-auto text-white ">
          {typeof songs === "string" || songs?.length === 0 ? (
            <h2 className="text-xds  pb-2 text-[#dadada]">
              Please try a different search keyword...
            </h2>
          ) : songs ? (
            <Songs songs={songs} setShowSearch={setShowSearch} />
          ) : (
            <Suggestions />
          )}
        </div>
      </div>
    </div>
  );
};

