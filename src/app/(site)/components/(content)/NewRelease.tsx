"use client";
import { typeMusic } from "@/actions/getSongs";
import getBreakpoint from "@/helpers/getBreakpoint";
import getClassName from "@/helpers/getClassName";
import useList from "@/hooks/(data)/useList";
import useSong from "@/hooks/(data)/useSong";
import usePlayer from "@/hooks/(player)/usePlayer";
import useBreakpoint from "@/hooks/(utils)/useBreakpoint";
import useNavigation from "@/hooks/(utils)/useNavigation";
import { cn } from "@/libs/utils";
import { ranking } from "@/store/queryKeys";
import { Tab } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsChevronRight, BsThreeDots } from "react-icons/bs";
import { Song } from "../../../../../types";
import RankingCard from "@/components/RankingCard";
const NewRelease = () => {
  return (
    <div className="flex flex-col gap-y-5 ">
      <div className="flex flex-col gap-3">
        {" "}
        <h2 className="text-lg font-bold text-white">Mới phát hành</h2>
      </div>
      <div className="flex justify-between">
        <RankingTabs />
      </div>
    </div>
  );
};
export default NewRelease;
export const categories = ["Tất cả", "Việt Nam", "Quốc tế"];

function RankingTabs() {
  const { setNavigation } = useNavigation();

  const router = useRouter();
  const breakpoints = getBreakpoint([1, 1, 2, 2, 3, 3]);
  const [lists, setLists] = useState<(Song[] | undefined)[] | undefined>(
    undefined,
  );

  const { getRankingList } = useList();
  const className = getClassName(breakpoints);
  const item = useBreakpoint(breakpoints);
  const { isLoading, data } = useSong(
    ranking.rankings,
    typeMusic[Math.round(Math.random() * 3)],
    item * 4 * 3,
  );
  const { currentSong } = usePlayer();
  const active = "bg-login focus:outline-none";

  useEffect(() => {
    if (data) {
      const lists: any = getRankingList(ranking.rankings, data as Song[], item);
      lists && lists.length !== 0 && setLists(lists);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, isLoading, data]);

  return (
    <div className="w-full  px-2  sm:px-0">
      {isLoading ? (
        <RankingLoading />
      ) : (
        <Tab.Group>
          <Tab.List className="w-full flex space-x-2  bg-transparent  text-white">
            <div className="w-full flex justify-between">
              <div className="flex gap-2 sm:gap-4">
                {categories.map((category) => {
                  return (
                    <Tab
                      key={category}
                      className={({ selected }) =>
                        cn(
                          `w-18 text-xxx sm:text-xs sm:w-20 h-6 flex items-center justify-center border border-slate-100/10 rounded-full font-medium`,
                          selected && active,
                        )
                      }
                    >
                      <span className="uppercase text-xs leading-6">
                        {category}
                      </span>
                    </Tab>
                  );
                })}
              </div>
              <div
                onClick={() => setNavigation(() => router.push("/ranking"))}
                className="flex gap-2 items-center text-xx uppercase text-contentDesc hover:text-textPrimary  font-semibold cursor-pointer leading-3"
              >
                <span className="hidden sm:block">Tất cả</span>
                <BsChevronRight className="text-base sm:text-inherit translate-x-full sm:translate-x-0" />
              </div>
            </div>
          </Tab.List>
          <Tab.Panels>
            {lists?.map((list, index) => {
              return (
                <Tab.Panel key={index} className={cn("py-4 ", className)}>
                  {list?.map((song, index) => (
                    <div key={song.src}>
                      <RankingCard
                        active={song.src === currentSong?.src}
                        key={song.src}
                        options={BsThreeDots}
                        className="w-80 h-18"
                        data={song}
                      />
                    </div>
                  ))}
                </Tab.Panel>
              );
            })}
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  );
}

function RankingLoading() {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full h-8 animate-pulse bg-slate-600 rounded-md" />
      <div className="w-full h-90 animate-pulse bg-slate-600 rounded-md" />
    </div>
  );
}

