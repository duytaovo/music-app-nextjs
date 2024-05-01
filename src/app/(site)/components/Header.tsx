"use client";
import Download from "@/app/(site)/components/(header)/Download";
import Search from "@/app/(site)/components/(header)/Search";
import Settings from "@/app/(site)/components/(header)/Settings";
import Avatar from "@/components/Avatar";
import useNavigation from "@/hooks/(utils)/useNavigation";
import { cn } from "@/libs/utils";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
interface HeaderProps {
  currentUser: User | undefined;
}
const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const router = useRouter();
  const { index, max, setNavigation } = useNavigation();

  return (
    <section
      className={cn(
        "z-10 right-0 left-11 sm:left-sidebarHeight px-8 sm:px-12  lg:left-sidebarWidth  bg-content h-sidebarHeight fixed top-0 ",
      )}
    >
      <div
        className="h-full flex gap-16 sm:gap-0 sm:justify-between items-center
               "
      >
        {/* Btn-Search */}
        <div className="flex  justify-between gap-7 items-center ">
          <div className="hidden md:flex gap-6 font-medium">
            <button
              disabled={index === 0}
              onClick={() => setNavigation(() => router.back(), -1)}
              className={cn(index !== 0 ? "text-white" : "opacity-80")}
            >
              <BsArrowLeft size={22} title="Back" />
            </button>
            <button
              disabled={max === index || max === -1}
              onClick={() => setNavigation(() => router.forward())}
              className={cn(max > index ? "text-white" : "opacity-80")}
            >
              <BsArrowRight size={22} title="Forward" />
            </button>
          </div>
          <div className="flex ">
            {" "}
            <Search />
          </div>
        </div>
        {/* Settings */}
        <div className="flex justify-between gap-3">
          <Download />
          <Settings />
          <Avatar currentUser={currentUser} />
        </div>
      </div>
    </section>
  );
};
export default Header;

