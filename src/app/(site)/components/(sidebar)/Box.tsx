"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { IconType } from "react-icons/lib";
import { usePathname, useRouter } from "next/navigation";
import useSidebar from "@/hooks/(sidebar)/useSidebar";
import useNavigation from "@/hooks/(utils)/useNavigation";
import { toast } from "react-toastify";
import { cn } from "@/libs/utils";
import { text } from "../(header)/ActiveAvatar";
interface BoxProps {
  data: {
    label: string;
    href: string;
    active: boolean;
    icon: React.SVGProps<SVGAElement>;
    secondary?: React.SVGProps<SVGAElement>;
    play?: IconType;
    right?: IconType;
    left?: IconType;
    disabled?: boolean;
    link?: boolean;
  }[];
  item?: number;
}
const Box: React.FC<BoxProps> = ({ data, item: display }) => {
  const { setNavigation } = useNavigation();
  const pathname = usePathname();
  const router = useRouter();
  const { showSidebar, setShowSidebar } = useSidebar();
  const [show, setShow] = useState<number>(-1);
  const condition = (
    classNameTrue: string | StaticImageData | boolean,
    classNameFalse: string | StaticImageData | boolean,
  ) => {
    if (display === 2) {
      return classNameTrue;
    } else {
      if (showSidebar) {
        return classNameTrue;
      }
      return classNameFalse;
    }
  };
  const conditionButton = (classNameTrue: any, classNameFalse: any) => {
    if (display === 2) {
      if (!classNameFalse) return classNameFalse;
      return classNameTrue;
    } else {
      if (showSidebar) {
        return classNameTrue;
      }
      return classNameFalse;
    }
  };
  return (
    <div className="w-full flex flex-col">
      {data.map((item, index) => (
        <div
          onClick={() => {
            item.disabled
              ? toast.warning(text)
              : setNavigation(() =>
                  item.label !== "Radio"
                    ? router.push(item.href)
                    : pathname !== "/"
                    ? (router.push("/"),
                      setTimeout(() => {
                        document
                          .getElementById("radio")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 500))
                    : document
                        .getElementById("radio")
                        ?.scrollIntoView({ behavior: "smooth" }),
                );
          }}
          key={item.label}
          className={cn(
            "flex justify-between  h-full w-full    text-white",
            item.active && " bg-sidebarActive border-l-[3px] border-login",
            !item.right ? "py-3 px-[21px]" : "px-[15px]",
          )}
        >
          {/* Title */}
          {!item.right && !item.left && (
            <>
              <div
                className={cn(
                  "flex items-center text-xds font-medium",
                  item.disabled ? "cursor-not-allowed" : "cursor-pointer",
                )}
                onMouseEnter={() => setShow(index)}
                onMouseLeave={() => setShow(-1)}
              >
                <div
                  className={cn(
                    " flex items-center hover:opacity-100",

                    item.active ? " opacity-100" : "opacity-80",
                  )}
                >
                  <Image
                    alt={item.label}
                    src={item.icon as string | ""}
                    width={24}
                    height={24}
                    className={cn("mr-3 ")}
                    color="white"
                    title={item.label}
                  />
                  <span className={cn(condition("inline-block", "hidden"))}>
                    {item.label}
                  </span>
                </div>
                {item.secondary && (
                  <Image
                    alt={item.label}
                    src={item.secondary as string | ""}
                    width={34}
                    height={16}
                    className={cn(
                      "ml-2 opacity-100",
                      condition("inline-block", "hidden"),
                    )}
                  />
                )}
              </div>
              {/* Play */}
              {item.play && condition(true, false) && show === index && (
                <item.play size={24} className="text-white " />
              )}
            </>
          )}
          {/* Left - Right */}
          {item.right && item.left && (
            <>
              <div
                className={cn(
                  "hidden sm:flex items-center text-xds font-medium  ",
                  item.disabled ? "cursor-not-allowed" : "cursor-pointer",
                )}
                onMouseEnter={() => setShow(index)}
                onMouseLeave={() => setShow(-1)}
              >
                <div
                  className={cn(
                    " flex items-center hover:opacity-100",

                    item.active ? " opacity-100" : "opacity-80",
                  )}
                >
                  {conditionButton(
                    <Image
                      alt={item.label}
                      src={item.icon as string | ""}
                      width={24}
                      height={24}
                      className={cn("mr-3 ")}
                      color="white"
                      title={item.label}
                    />,
                    <div
                      onClick={(e) => (
                        e.stopPropagation(), setShowSidebar(true)
                      )}
                      className="w-9 h-9 bg-sidebarActive rounded-full flex justify-center items-center cursor-pointer hover:opacity-80 font-semibold"
                    >
                      <item.right size={14} />
                    </div>,
                  )}

                  <span
                    onClick={() => item.disabled && toast.warning(text)}
                    className={cn(condition("inline-block", "hidden"))}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
              {conditionButton(
                <div
                  onClick={(e) => (e.stopPropagation(), setShowSidebar(false))}
                  className="hidden w-9 h-9 bg-sidebarActive rounded-full sm:flex justify-center items-center cursor-pointer hover:opacity-80 font-semibold"
                >
                  <item.left size={14} />
                </div>,
                "",
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
export default Box;

