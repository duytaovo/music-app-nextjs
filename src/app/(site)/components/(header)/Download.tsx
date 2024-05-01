// "use client";
import { VscDesktopDownload } from "react-icons/vsc";
const Download = () => {
  return (
    <a
      href="https://github.com/zmp3-pc/zmp3-pc/releases/download/v1.1.3/Zing-MP3-Setup-1.1.3.exe"
      target="_blank"
      className="hidden lg:flex py-[10px] px-5 h-9 justify-items-center bg-search w-[190px] rounded-full gap-1 cursor-pointer hover:opacity-90"
    >
      <VscDesktopDownload
        size={20}
        className="text-textPrimary"
        title="Tải xuống"
      />
      <span className="text-textPrimary text-xds font-semibold">
        Tải bản Windows
      </span>
    </a>
  );
};
export default Download;

