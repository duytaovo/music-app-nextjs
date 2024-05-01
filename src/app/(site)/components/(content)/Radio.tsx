"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import getBreakpoint from "@/helpers/getBreakpoint";
import { useEffect, useState } from "react";
import useSong from "@/hooks/(data)/useSong";
import { radio } from "@/store/queryKeys";
import { typeMusic } from "@/actions/getSongs";
import { Song } from "../../../../../types";
import RadioCard from "@/components/RadioCard";

const Radio = () => {
  const [list, setList] = useState<Song[] | undefined>(undefined);
  const { isLoading, data } = useSong(
    radio.radios,
    typeMusic[Math.round(Math.random() * 3)],
    9,
  );

  useEffect(() => {
    if (data) {
      setList(data as Song[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data]);
  const router = useRouter();

  return (
    <div id="radio" className=" flex flex-col gap-y-5 ">
      <div className="flex justify-between">
        {" "}
        <h2 className="text-lg font-bold text-white">Radio Nổi Bật</h2>
      </div>
      {list && (
        <Slider {...settings}>
          {list.map((song) => (
            <div
              key={song.src}
              className="
                  px-8 sm:px-3 
                     w-full
                  sm:w-1/3 
                  md:w-1/4 
                  lg:w-1/5 
                  xl:w-1/6 
                  2xl:w-1/7 
                  "
            >
              {" "}
              <RadioCard song={song} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

const breakpoints = getBreakpoint([1, 3, 4, 5, 7, 7]);
const settings = {
  speed: 500,
  infinite: false,
  slidesToShow: 2,

  nextArrow: (
    <NextArrow breakpoints={breakpoints} customClassName={"-translate-y-1/2"} />
  ),
  prevArrow: (
    <PrevArrow breakpoints={breakpoints} customClassName={"-translate-y-1/2"} />
  ),
  responsive: [
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 639,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 1279,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 1535,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
      },
    },
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 7,
      },
    },
  ],
};

export default Radio;

