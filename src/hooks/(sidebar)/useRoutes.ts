import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Home from "@/public/images/sidebar/home.svg";
import ZingChart from "@/public/images/sidebar/zingchart.svg";
import Library from "@/public/images/sidebar/library.svg";
import Radio from "@/public/images/sidebar/radio.svg";
import Rankings from "@/public/images/sidebar/rankings.svg";
import Hub from "@/public/images/sidebar/hub.svg";
import Upload from "@/public/images/sidebar/upload.svg";
import Live from "@/public/images/sidebar/live.svg";
import { MdPlayCircleOutline } from "react-icons/md";
import Plus from "@/public/images/sidebar/plus.svg";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const useRoutes = () => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: Home,
        label: "Khám Phá",
        active: pathname === "/",
        href: "/",
      },
      {
        icon: ZingChart,
        label: "#zingchart",
        active: pathname === "/zingchart",
        href: "/zingchart",
        play: MdPlayCircleOutline,
      },
      {
        icon: Radio,
        label: "Radio",
        active: pathname === "/#radio",
        href: "#radio",
        secondary: Live,
        play: MdPlayCircleOutline,
      },
      {
        icon: Library,
        label: "Thư Viện",
        active: pathname === "/library",
        href: "/library",
        play: MdPlayCircleOutline,
      },
      {
        icon: Rankings,
        label: "BXH Nhạc Mới",
        active: pathname === "/ranking",
        href: "/ranking",
        play: MdPlayCircleOutline,
      },
      {
        icon: Hub,
        label: "Chủ Đề & Thể Loại",
        active: pathname === "/album/1",
        href: "/album/1",
      },
      {
        icon: Upload,
        label: "Cá nhân",
        active: pathname === "/mymusic/uploaded",
        href: "/mymusic/uploaded",
      },

      {
        icon: Plus,
        label: "Tạo playlist mới",
        active: pathname === "/playlist",
        href: "/",
        right: BsChevronRight,
        left: BsChevronLeft,
        disabled: true,
      },
    ],
    [pathname],
  );
  return routes;
};
export default useRoutes;

