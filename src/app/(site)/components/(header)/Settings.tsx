"use client";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { LuPaintbrush2, LuPhone } from "react-icons/lu";
import { VscPlayCircle } from "react-icons/vsc";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiAdvertisementFill } from "react-icons/ri";
import { GiBlackBook } from "react-icons/gi";
import { HiOutlineShieldCheck, HiOutlineArrowUpRight } from "react-icons/hi2";
import { BsChevronRight } from "react-icons/bs";
import Logo from "@/public/images/sidebar/logo.svg";
import PlayModal from "@/models/(header)/PlayModal";
import InterfaceModal from "@/models/(header)/InterfaceModal";
import InfoModal from "@/models/(header)/InfoModal";
import useSettings from "@/hooks/(header)/useSettings";

const Settings = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const settings = getSettings();
  const settingsOptions = settings.slice(0, 2);
  const settingsInfo = settings.slice(2, 3);
  const settingsContact = settings.slice(3, 7);
  return (
    <Popover className="relative z-10">
      {({ open, close }) => (
        <>
          <Popover.Button className="hidden relative z-10 w-9 h-9 sm:flex items-center justify-center  rounded-full bg-search focus:outline-none hover:opacity-90">
            <FiSettings size={20} title="Cài đặt" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className=" absolute  left-10 z-10 mt-3 w-54  -translate-x-full transform ">
              <div className="relative z-10 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ">
                <div className="relative z-10 rounded-md bg-searchFocus p-[6px] ">
                  {/* Options */}
                  {settingsOptions.map((setting) =>
                    setting?.id === 1 ? (
                      <PlayModal key={setting.label + Math.random() * 10}>
                        <div className="flex justify-between h-11 py-2.5 px-[10px]   text-searchText text-xds items-center rounded-md opacity-90 hover:opacity-100 cursor-pointer hover:bg-settingsFocus focus:outline-none">
                          <div className="flex gap-2 ">
                            <div className="h-5   w-h-5 items-center justify-center ">
                              <setting.icon aria-hidden="true" size={18} />
                            </div>
                            <span>{setting.label}</span>
                          </div>
                          <div>
                            {setting?.secondary && (
                              <setting.secondary size={19} />
                            )}
                          </div>
                        </div>
                      </PlayModal>
                    ) : (
                      <InterfaceModal key={setting.label + Math.random() * 10}>
                        <div className="flex justify-between h-11 py-2.5 px-[10px]   text-searchText text-xds items-center rounded-md opacity-90 hover:opacity-100 cursor-pointer hover:bg-settingsFocus">
                          <div className="flex gap-2 ">
                            <div className="h-5   w-h-5 items-center justify-center ">
                              <setting.icon aria-hidden="true" size={18} />
                            </div>
                            <span>{setting.label}</span>
                          </div>
                          <div>
                            {setting?.secondary && (
                              <setting.secondary size={19} />
                            )}
                          </div>
                        </div>
                      </InterfaceModal>
                    ),
                  )}
                  <hr className="m-2 mx-[10px] bg-contentDesc opacity-50 h-[2px]" />
                  {/* Info */}
                  {settingsInfo.map((setting) => (
                    <>
                      <InfoModal
                        key={setting.label + Math.random() * 10}
                        data={{
                          data: setting.data,
                          icon: setting.secondary,
                        }}
                        isOpenModal={isOpenModal}
                        setIsOpenModal={setIsOpenModal}
                      />
                      <div
                        className="flex justify-between gap-2 h-11 py-2.5 px-[10px] text-searchText text-xds items-center rounded-md cursor-pointer opacity-50 hover:opacity-100 hover:bg-settingsFocus"
                        onClick={(e) => {
                          setIsOpenModal(true);
                        }}
                      >
                        <div className="flex gap-2 ">
                          <div className="h-5 w-5 items-center justify-center focus:outline-none">
                            <setting.icon
                              aria-hidden="true"
                              size={18}
                              className="focus:outline-none"
                            />
                          </div>
                          <span>{setting.label}</span>
                        </div>
                      </div>
                    </>
                  ))}
                  {/* Contact */}
                  {settingsContact.map((setting) => (
                    <Link
                      href={setting.href as string}
                      target="blank"
                      key={setting.label + Math.random() * 10}
                      className="flex justify-between gap-2 h-11 py-2.5 px-[10px] text-searchText text-xds items-center rounded-md cursor-pointer opacity-50 hover:opacity-100 hover:bg-settingsFocus"
                    >
                      <div className="flex gap-2 ">
                        <div className="h-5   w-h-5 items-center justify-center ">
                          <setting.icon aria-hidden="true" size={18} />
                        </div>
                        <span>{setting.label}</span>
                      </div>
                      <div>
                        {setting?.secondary && <setting.secondary size={14} />}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

const getSettings = () => [
  {
    id: 1,
    icon: VscPlayCircle,
    label: "Trình phát nhạc",
    secondary: BsChevronRight,
  },
  {
    id: 2,
    icon: LuPaintbrush2,
    label: "Giao diện",
    secondary: BsChevronRight,
  },
  {
    icon: AiOutlineInfoCircle,
    label: "Giới thiệu",
    secondary: Logo,
    data: [
      "Giấy phép mạng xã hội: 157/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 24/4/2019",
      "Chủ quản: Công Ty Cổ Phần VNG Z06 Đường số 13, phường Tân Thuận Đông, quận 7, thành phố Hồ Chí Minh, Việt Nam",
    ],
  },
  {
    icon: LuPhone,
    label: "Liên hệ",
    secondary: HiOutlineArrowUpRight,
    href: "https://mp3.zing.vn/huong-dan/contact",
  },
  {
    icon: RiAdvertisementFill,
    label: "Quảng cáo",
    secondary: HiOutlineArrowUpRight,
    href: "https://adtima.vn/lien-he?utm_source=zingmp3&utm_medium=footer",
  },
  {
    icon: GiBlackBook,
    label: "Thỏa thuận sử dụng",
    secondary: HiOutlineArrowUpRight,
    href: "https://mp3.zing.vn/tnc",
  },
  {
    icon: HiOutlineShieldCheck,
    label: "Chỉnh sách bảo mật",
    secondary: HiOutlineArrowUpRight,
    href: "https://zingmp3.vn/privacy.html",
  },
];
export default Settings;

