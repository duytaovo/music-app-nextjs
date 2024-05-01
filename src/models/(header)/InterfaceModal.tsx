"use client";
import usePopup from "@/hooks/(utils)/usePopup";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import OptionsModal from "./OptionsModal";
import { SwitchBox } from "./PlayModal";

interface InterfaceModalProps {
  children: React.ReactNode;
}
const InterfaceModal: React.FC<InterfaceModalProps> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const { buttonRef, onClose, onOpen } = usePopup();
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <div>
          <Popover.Button
            ref={buttonRef}
            onMouseEnter={() => onOpen(open)}
            onMouseLeave={() => onClose(open, close)}
            className="w-full focus:outline-none"
          >
            {children}
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
            <Popover.Panel
              onMouseEnter={() => onOpen(open)}
              onMouseLeave={() => onClose(open, close)}
              className="absolute w-80 h-[162px] -top-[12px] -left-2.5  z-10 mt-3  -translate-x-full transform "
            >
              <div className=" h-full   shadow-lg ring-1 ring-black ring-opacity-5">
                <div className=" relative h-full bg-searchFocus rounded-md p-[6px] ">
                  {/* Options */}
                  <div className=" h-full px-[6px]   flex flex-col gap-1">
                    <OptionsModal isOpen={isOpen} setOpen={setOpen} />
                    <div className="flex flex-col gap-3">
                      <div
                        onClick={() => setOpen(true)}
                        className="w-full   flex gap-2 items-end justify-between text-searchText opacity-90 hover:opacity-100 cursor-pointer"
                      >
                        <h2 className="text-xds ">Chủ đề</h2>
                        <div className="h-[21px] flex items-center">
                          <BsChevronRight />
                        </div>
                      </div>
                    </div>
                    <div className="w-full   flex gap-2 items-end text-white">
                      <div className="w-[86px] h-[58px] rounded-sm bg-gradient-to-tl from-login "></div>
                      <h2 className="text-sm font-bold">Tím</h2>
                    </div>
                    <hr className="mx-[6px] my-[10px]  opacity-20 h-[2px]" />
                    <div className="flex flex-col gap-3 ">
                      <div className="w-full h-10  flex gap-2 items-center justify-between text-searchText opacity-90 hover:opacity-100 cursor-pointer">
                        <h2 className="text-xds ">Hiệu ứng chuyển động</h2>
                        <div className="h-[21px] flex items-center">
                          <SwitchBox />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  );
};

export default InterfaceModal;

