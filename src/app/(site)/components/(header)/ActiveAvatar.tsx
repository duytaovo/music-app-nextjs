"use client";
import useUploadModal from "@/hooks/(header)/useUploadModal";
import { cn } from "@/libs/utils";
import LoadingModal from "@/models/(content)/LoadingModal";
import Placeholder from "@/public/images/placeholder.png";
import { User } from "@prisma/client";
import axios from "axios";
import { signOut } from "next-auth/react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { GoDownload, GoSignOut } from "react-icons/go";
import { IoBanOutline } from "react-icons/io5";
import { toast } from "react-toastify";
export const text = "This feature is currently not available...";
interface ActiveAvatarProps {
  currentUser: User | undefined;
}
const uploadPreset = "kbjrbfku";
const ActiveAvatar: React.FC<ActiveAvatarProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const { setShowUploadModal } = useUploadModal();

  const handleUpload = useCallback(
    (result: any) => {
      const image = result.info.secure_url;
      if (image.includes("mp3")) return toast.error("Invalid type of file");
      setLoading(true);
      axios
        .post("/api/user/avatar", {
          userId: currentUser?.id,
          image,
        })
        .then(
          () => (
            router.refresh(), toast.success("Changed Avatar Successfully!")
          ),
        )
        .finally(() => setLoading(false));
    },
    [currentUser, router],
  );
  return (
    <>
      <LoadingModal show={isLoading} />
      <div className="w-full py-2 px-2 flex flex-col justify-start gap-2">
        {/* // Part 1 */}
        <div className="flex flex-col gap-2 py-2">
          {/* // Image */}
          <div className="flex gap-3 items-center">
            <CldUploadWidget
              onSuccess={handleUpload}
              uploadPreset={uploadPreset}
              options={{ maxFiles: 1 }}
            >
              {({ open }) => {
                return (
                  <div
                    onClick={() => currentUser?.username && open()}
                    className={cn(
                      "w-14 h-w-14   rounded-full  overflow-hidden flex aspect-square justify-center items-center",
                      currentUser?.username
                        ? "hover:scale-105 hover:opacity-80 cursor-pointer hover:border-dashed hover:border-2"
                        : "cursor-not-allowed",
                    )}
                  >
                    <Image
                      src={currentUser?.image || Placeholder}
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt="Avatar"
                      style={{ width: "100%", height: "auto" }}
                      className="aspect-square object-cover rounded-full"
                    />
                  </div>
                );
              }}
            </CldUploadWidget>
            <div className="flex flex-col justify-center gap-1 text-white">
              <h2 className="text-sm font-bold text-clip">
                {currentUser?.username || currentUser?.email || "Hải"}
              </h2>
              <span
                className={cn(
                  "text-[11px]  w-fit py-0.5 px-1 rounded-md  uppercase font-bold tracking-widest",
                  currentUser?.isSubscribed
                    ? "bg-yellow-400 text-black"
                    : "bg-slate-300/50 text-white",
                )}
              >
                {currentUser?.isSubscribed ? "vip" : "basic"}
              </span>
            </div>
          </div>
          {/* // Upgrade */}
          <div
            onClick={() => {
              !currentUser?.isSubscribed
                ? (async () => {
                    const res = await axios.post("/api/checkout", {
                      data: "",
                    });
                    window.location = res.data.url;
                  })()
                : toast.warn("You had a subscription");
            }}
            className="w-full rounded-full bg-settingsFocus flex items-center justify-center py-2 hover:opacity-90 cursor-pointer "
          >
            <p className="text-xds font-semibold text-white">
              Nâng cấp tài khoản
            </p>
          </div>
        </div>
        {/* // Barrier */}
        <hr className=" border-settingsFocus px-1" />
        {/* // Part 2 */}
        <div className="flex flex-col gap-2 pt-2">
          <h2 className="text-sm font-bold text-white">Cá nhân</h2>
          <div
            onClick={() => {
              toast.warning(text);
            }}
            className="rounded-full p-2 cursor-not-allowed hover:bg-settingsFocus w-full flex gap-2 items-center"
          >
            {" "}
            <IoBanOutline size={20} />
            <p className="text-xds ">Danh sách chặn</p>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation;
              setShowUploadModal(true);
            }}
            className="rounded-full p-2 cursor-pointer hover:bg-settingsFocus w-full flex gap-2 items-center"
          >
            {" "}
            <GoDownload size={20} />
            <p className="text-xds ">Tải lên</p>
          </div>
        </div>
        {/* // Barrier */}
        <hr className=" border-settingsFocus px-1" />
        {/* // Part 3 */}
        <div
          onClick={() =>
            signOut({ redirect: true, callbackUrl: process.env.NEXTAUTH_URL })
          }
          className="rounded-full p-2 cursor-pointer hover:bg-settingsFocus w-full flex gap-2 items-center"
        >
          {" "}
          <GoSignOut size={20} />
          <p className="text-xds ">Đăng suất</p>
        </div>
      </div>
    </>
  );
};
export default ActiveAvatar;

