//@ts-nocheck
"use client";
import Card from "@/components/Card";
import getPosition from "@/helpers/getPosition";
import useSinger from "@/hooks/(data)/useSinger";
import usePlayer from "@/hooks/(player)/usePlayer";
import usePopup from "@/hooks/(utils)/usePopup";
import useWindowSize from "@/hooks/(utils)/useWindowSize";
import placeholder from "@/public/images/placeholder.png";
import { Song } from "@/types";
import { Popover, Transition } from "@headlessui/react";
import { cn } from "@/libs/utils";
import truncate from "lodash.truncate";
import { Fragment, useCallback, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
interface PositionProps {
  height: number;
  width: number;
}
interface ArtistPopupProps {
  children: React.ReactNode;
  singer: string;
}
const description = () => {
  return "Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s";
};

function ArtistModal({ children, singer }: ArtistPopupProps) {
  let timer: NodeJS.Timeout;
  const { showPlayer, setShowPlayer, setPlaying, setPlaylist } = usePlayer();
  const { buttonRef, onClose, onOpen } = usePopup();
  const size = useWindowSize();
  const [position, setPosition] = useState<PositionProps>({
    height: 0,
    width: 0,
  });
  const [artist, setArtist] = useState<Song[]>();
  const { isLoading, data } = useSinger(singer);
  const className = getPosition(position);
  const getArtistData = useCallback(() => {
    if (typeof data !== "string" && !isLoading) setArtist(data);
  }, [data, isLoading]);
  if (isLoading) return <h2>Loading...</h2>;
  return (
    <Popover className="w-fit focus:outline-none   ">
      {({ open, close }) => (
        <div className="relative w-fit">
          <Popover.Button
            onMouseEnter={(e) => {
              timer = setTimeout(() => {
                const width = (e.clientX * 100) / size?.width;
                const height = (e.clientY * 100) / size?.height;
                setPosition({ width, height });
                getArtistData();
                onOpen(open);
              }, 400);
            }}
            ref={buttonRef}
            className="w-fit relative  focus:outline-none hover:underline hover:text-textPrimary"
            onMouseLeave={() => {
              clearTimeout(timer);
              onClose(open, close);
            }}
          >
            {children}
          </Popover.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-50 "
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 "
            leave="transition ease-in  duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              /* Z-index */
              className={cn("absolute  z-40 w-80 ", className)}
            >
              <div className="relative h-full  shadow-lg ring-1 ring-black ring-opacity-5">
                <div
                  onMouseEnter={(e) => {
                    onOpen(open);
                  }}
                  onMouseLeave={() => {
                    onClose(open, close);
                  }}
                  className="relative h-full bg-searchFocus rounded-md p-4 flex flex-col gap-4 overflow-hidden  "
                >
                  {/* Heading */}
                  <div className="h-full flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-11 h-11">
                        <Card
                          btnPlay={{ show: true, size: 25 }}
                          circle
                          image={artist?.[0]?.image || placeholder}
                          className="h-11 w-11 "
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xds text-white font-bold">
                          {singer}
                        </span>
                        <span className="text-xx text-contentDesc">
                          {(artist && artist[0]?.favorites) || "(Empty)"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-28 h-6 text-white flex  px-2 py-1.5 bg-login items-center justify-center rounded-full hover:opacity-80 cursor-not-allowed">
                        <div className="flex gap-1 items-center ">
                          <AiOutlineUserAdd size={17} className="font-medium" />
                          <span className="text-xx leading-6 font-normal tracking-wider">
                            QUAN TÂM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Description */}
                  <div className="w-full flex flex-col text-white ">
                    <p className="hover:text-textPrimary cursor-pointer hover:underline">
                      {truncate(description(), {
                        length: 100,
                        separator: " ",
                        omission: "...Xem thêm",
                      })}
                    </p>
                  </div>
                  {/* Songs */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xds font-bold  text-white">Mới nhất</h2>
                    <div className="flex gap-3">
                      {artist ? (
                        artist?.slice(0, artist?.length).map((song, index) => (
                          <div className="w-16" key={song.link}>
                            <Card
                              onClick={(e) => {
                                {
                                  e.stopPropagation();
                                  !showPlayer && setShowPlayer(true);
                                  setPlaying(song, true), setPlaylist(song);
                                }
                              }}
                              data={song}
                              btnPlay={{ show: true }}
                              image={song.image}
                              className="w-16 h-16"
                            />
                            <h2 className="text-xx text-white line-clamp-2  leading-3">
                              {song.songName}
                            </h2>
                          </div>
                        ))
                      ) : (
                        <h2>(Empty)</h2>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  );
}

export default ArtistModal;

