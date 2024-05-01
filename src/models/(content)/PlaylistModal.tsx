//@ts-nocheck
"use client";
import Image from "next/image";
import getPosition from "@/helpers/getPosition";
import Card from "@/components/Card";
import usePopup from "@/hooks/(utils)/usePopup";
import useWindowSize from "@/hooks/(utils)/useWindowSize";
import { Popover, Transition } from "@headlessui/react";
import { cn } from "@/libs/utils";
import { Fragment, useState } from "react";
import { TfiHeart } from "react-icons/tfi";
import { SlEarphones } from "react-icons/sl";
import {
  BsChevronRight,
  BsDownload,
  BsMic,
  BsPlayCircle,
} from "react-icons/bs";
import { BiBlock } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineUserAdd } from "react-icons/ai";
import truncate from "lodash.truncate";
import bmw from "@/public/bmw.jpg";
import { StaticImageData } from "next/image";
import {
  RiAddCircleLine,
  RiLinksLine,
  RiPlayListAddLine,
  RiPlayListFill,
  RiShareForwardLine,
} from "react-icons/ri";
import { IconType } from "react-icons";
import { IoAdd } from "react-icons/io5";
interface PositionProps {
  height: number;
  width: number;
}
export interface PlaylistModalProps {
  children: React.ReactNode;
}

interface OptionsProps {
  icon: IconType;
  label: string;
  secondary?: IconType;
  modal?: string;
}

function PlaylistModal({ children }: PlaylistModalProps) {
  const options: OptionsProps[] = getOptions();
  const size = useWindowSize();
  const [position, setPosition] = useState<PositionProps>({
    height: 0,
    width: 0,
  });
  const className = getPosition(position);

  return (
    <Popover className="w-full focus:outline-none ">
      {({ open, close }) => (
        <div className="relative w-full">
          <Popover.Button
            onClick={(e) => {
              const width = (e.clientX * 100) / size.width;
              const height = (e.clientY * 100) / size.height;
              setPosition({ width, height });
            }}
            className="w-full relative  focus:outline-none cursor-pointer hover:bg-contentFocus"
          >
            {children}
          </Popover.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-50 "
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100"
            leave="transition ease-in  duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className={cn(
                "absolute z-10 w-48 bg-searchFocus rounded-md",
                className && className,
                "px-[-4px]",
              )}
              onMouseLeave={() => close()}
            >
              <div className="flex flex-col justify-center gap-1 py-1">
                {/* Search */}
                <div className="px-3 py-1">
                  <div className="bg-settingsFocus rounded-full h-8 w-full px-3 ">
                    <input
                      type="text"
                      placeholder="Tìm playlist"
                      className="h-full placeholder:text-searchText placeholder:bg-transparent bg-transparent text-xds focus:outline-none"
                    />
                  </div>
                </div>
                {/* Playlists */}
                <div className="flex flex-col  items-start text-searchText ">
                  <div className="w-full flex items-center gap-2 cursor-pointer hover:bg-contentFocus px-3 py-1">
                    <div className="w-5 h-5 rounded-lg text-white">
                      <IoAdd size={16} />
                    </div>
                    <span className="text-xds">Tạo playlist mới</span>
                  </div>

                  {options.map((option) => (
                    <div
                      key={option.label}
                      className="flex w-full justify-between cursor-pointer hover:bg-contentFocus px-3 py-1"
                    >
                      <div className="flex gap-2">
                        <div>
                          <option.icon size={16} />
                        </div>
                        <span className="text-xds">{option.label}</span>
                      </div>
                      {option.secondary && (
                        <div className="flex items-center">
                          <option.secondary size={18} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  );
}

const getOptions = () => [
  {
    icon: AiOutlineHeart,
    label: "Playlist",
  },
  {
    icon: RiPlayListAddLine,
    label: "Playlist",
  },
  {
    icon: RiPlayListFill,
    label: "Playlist",
  },
  {
    icon: RiAddCircleLine,
    label: "Playlist",
  },
  {
    icon: RiLinksLine,
    label: "Playlist",
  },
  {
    icon: RiShareForwardLine,
    label: "Playlist",
  },
];

export default PlaylistModal;

