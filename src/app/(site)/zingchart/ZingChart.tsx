"use client";

import { Slug } from "@/actions/getSongs";
import InfinitePage from "@/components/InfinitePage";
import UseQueryScroll from "@/hooks/(data)/useQueryScroll";
import usePlayer from "@/hooks/(player)/usePlayer";
import { cn } from "@/libs/utils";
import { ElementRef, useEffect, useRef, useState } from "react";
import { Song } from "../../../../types";
const slugs: Slug[] = ["/trending", "/favorite", "/new-music", "/top-views"];
const ZingChart = () => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { showPlayer } = usePlayer();
  const {
    data,
    fetchNextPage,
    isLoading,
    isFetching,
    status,
    isFetchingNextPage,
  } = UseQueryScroll({
    slug: slugs[0],
  });

  const root = useRef<ElementRef<"div">>(null);

  if (!isMounted) return null;
  return (
    <>
      <section className="relative h-screen bg-content mt-sidebarHeight overflow-hidden ">
        <div
          ref={root}
          className={cn(
            " pt-8  lg:flex gap-10  px-12 overflow-hidden overflow-y-auto",
            showPlayer ? "h-[calc(100vh-70px)]" : "h-screen",
            showPlayer ? "pb-24" : "pb-20",
          )}
        >
          <InfinitePage
            data={data?.pages as Song[][]}
            fetchNextPage={fetchNextPage}
            root={root}
          />
        </div>
        {(isFetching || isLoading || isFetchingNextPage) && (
          <div className="absolute bottom-28 z-50 w-full flex justify-center text-white text-xds">
            <div className="h-8 w-8 border-3 border-t-4 border-gray-200 border-t-fuchsia-500 animate-spin m-auto rounded-full shadow-md transition" />
          </div>
        )}
      </section>
    </>
  );
};

export default ZingChart;

