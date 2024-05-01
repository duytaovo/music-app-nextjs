interface InActiveAvatarProps {
  setShowLoginModal: (value: boolean) => void;
}
const InActiveAvatar: React.FC<InActiveAvatarProps> = ({
  setShowLoginModal,
}) => {
  return (
    <div className="w-full py-2 flex justify-center items-center">
      <div
        onClick={() => setShowLoginModal(true)}
        className="w-50 sm:w-64 h-8 sm:h-10 font-bold  text-white text-xds bg-login rounded-full flex justify-center items-center cursor-pointer hover:opacity-90 "
      >
        Đăng nhập
      </div>
    </div>
  );
};
export default InActiveAvatar;

