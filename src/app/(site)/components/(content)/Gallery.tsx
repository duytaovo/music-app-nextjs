"use client";

import getBreakpoint from "@/helpers/getBreakpoint";
import getClassName from "@/helpers/getClassName";
import useBreakpoint from "@/hooks/(utils)/useBreakpoint";
import useNavigation from "@/hooks/(utils)/useNavigation";
import { cn } from "@/libs/utils";
import one from "@/public/images/gallery/1.jpg";
import two from "@/public/images/gallery/2.jpg";
import three from "@/public/images/gallery/3.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Gallery = () => {
  const breakpoints = getBreakpoint([1, 2, 2, 3, 3, 3]);
  const className = getClassName(breakpoints);
  const item = useBreakpoint(breakpoints);
  const images = [one, two, three];
  const router = useRouter();
  const { setNavigation } = useNavigation();
  if (!item) return <Loading />;
  return (
    <div className={cn(" gap-10", className)}>
      {images.slice(0, item).map((image, idx) => (
        <div
          key={idx + Math.random() * 10}
          className="rounded-lg cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-350"
        >
          <Image
            onClick={() => {
              setNavigation(() => router.push(`album/${idx + 1}`));
            }}
            src={image}
            alt="image"
            width={0}
            height={0}
            className="object-contain  rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};
export default Gallery;

const Loading = () => {
  return (
    <div className="w-full -py-20">
      <div className="animate-pulse rounded-md bg-slate-600  w-full  py-20" />
    </div>
  );
};

