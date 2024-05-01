"use client";

import { cn } from "@/libs/utils";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
interface LikeProps {
  size?: number;
  className?: string;
  onClick: (e: any) => void;
  liked?: boolean;
  isLoading?: boolean;
}
const Like: React.FC<LikeProps> = ({
  size,
  className,
  onClick,
  liked,
  isLoading,
}) => {
  return (
    <div
      onClick={(e) => {
        !isLoading && onClick(e);
      }}
      className={cn(
        "w-6 h-6 hover:bg-slate-100/40 rounded-full flex items-center justify-center",
        className,
        isLoading ? "cursor-progress" : "cursor-pointer",
      )}
    >
      {" "}
      {liked ? (
        <AiTwotoneHeart size={size ? size : 23} className="font-bold" />
      ) : (
        <AiOutlineHeart size={size ? size : 23} className="font-bold" />
      )}
    </div>
  );
};
export default Like;

