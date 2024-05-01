"use client";

import useSearch from "@/hooks/(header)/useSearch";
import usePlayer from "@/hooks/(player)/usePlayer";
import useSidebar from "@/hooks/(sidebar)/useSidebar";

import { cn } from "@/libs/utils";
import Gallery from "./(content)/Gallery";
import Suggestion from "./(content)/Suggestion";
import NewRelease from "./(content)/NewRelease";
import NewRanking from "./(content)/NewRanking";
import Radio from "./(content)/Radio";
import Partner from "./(content)/Partner";

const Content = () => {
  const { setShowSearch } = useSearch();
  const { showSidebar } = useSidebar();
  const { showPlayer } = usePlayer();
  return (
    <div
      onClick={() => {
        setShowSearch(false);
      }}
      className={cn(
        " bg-content  overflow-hidden ",
        showSidebar ? "pl-sidebarHeight mt-sidebarHeight" : "mt-sidebarHeight",
      )}
    >
      <div
        className={cn(
          " pt-8 flex flex-col gap-12 px-12 overflow-x-hidden overflow-y-auto",
          showPlayer ? "h-[calc(100vh-70px)]" : "h-screen",
          showPlayer ? "pb-24" : "pb-20",
        )}
      >
        <Gallery />
        <Suggestion />
        <NewRelease />
        <NewRanking />
        <Radio />
        <Partner />
      </div>
    </div>
  );
};
export default Content;

