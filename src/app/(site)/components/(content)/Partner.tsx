"use client";
import Image, { StaticImageData } from "next/image";
import getClassName from "@/helpers/getClassName";
import bmw from "@/public/bmw.jpg";
import {
  Partner1,
  Partner2,
  Partner3,
  Partner4,
  Partner5,
  Partner6,
  Partner7,
  Partner8,
  Partner9,
  Partner10,
  Partner11,
  Partner12,
  Partner13,
  Partner14,
  Partner15,
  Partner16,
} from "@/public/index";
import getBreakpoint from "@/helpers/getBreakpoint";
import { cn } from "@/libs/utils";
const Partner = () => {
  const className = getClassName(breakpoints);
  return (
    <div className=" flex flex-col gap-y-5 ">
      <div className="w-full flex justify-center text-xs font-semibold tracking-wider text-contentDesc uppercase">
        đối tác âm nhạc
      </div>
      <div className="w-full">
        <div className={cn(" sm:h-1/7  lg:h-1/14  gap-3", className)}>
          {partners.map((partner, index) => (
            <div
              key={index + Math.random() * 10}
              className=" w-full h-full flex items-center justify-center bg-white rounded-md p-2"
            >
              <Image
                alt={"Partner"}
                src={partner.img || bmw}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="aspect-video object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center text-xs font-semibold tracking-wider text-contentDesc/50 uppercase text-center">
        <h2>This clone is for educational purpose only.</h2>
      </div>
    </div>
  );
};

const breakpoints = getBreakpoint([4, 4, 4, 8, 8, 8]);
const partners: Array<{ img: StaticImageData }> = [
  { img: Partner1 },
  { img: Partner2 },
  { img: Partner3 },
  { img: Partner4 },
  { img: Partner5 },
  { img: Partner6 },
  { img: Partner7 },
  { img: Partner8 },
  { img: Partner9 },
  { img: Partner10 },
  { img: Partner11 },
  { img: Partner12 },
  { img: Partner13 },
  { img: Partner14 },
  { img: Partner15 },
  { img: Partner16 },
];
export default Partner;

