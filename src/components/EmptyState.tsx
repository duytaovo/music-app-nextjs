import useUploadModal from "@/hooks/(header)/useUploadModal";
import empty from "@/public/images/empty.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiHomeHeart } from "react-icons/bi";
import { GoUpload } from "react-icons/go";
interface EmptyStateProps {
  text: string;
  upload?: boolean;
  home?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({ text, upload, home }) => {
  const { setShowUploadModal } = useUploadModal();
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-start10 ">
      <Image
        src={empty}
        alt="empty"
        width={0}
        height={0}
        className="object-contain  rounded-lg"
      />
      <p className="text-base text-center">{text}</p>

      <div className="w-fit px-3 py-2">
        <button
          onClick={() => {
            upload && setShowUploadModal(true);
            home && router.push("/");
          }}
          className="text-white text-center w-full rounded-full bg-fuchsia-600 px-4 py-2 focus:outline-none tracking-wide font-medium hover:opacity-80 flex items-center justify-center "
        >
          {upload && (
            <div className="flex items-center justify-center gap-2">
              <GoUpload size={20} />
              <span>Upload</span>
            </div>
          )}
          {home && (
            <div className="flex items-center justify-center gap-2">
              <BiHomeHeart size={20} />
              <span>Home</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
export default EmptyState;

