"use client";
import { Popover, Switch, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {} from "@/models/(header)/OptionsModal";
import usePopup from "@/hooks/(utils)/usePopup";
import { cn } from "@/libs/utils";

export interface PlayModalProps {
  children: React.ReactNode;
}
const PlayModal: React.FC<PlayModalProps> = ({ children }) => {
  const { buttonRef, onClose, onOpen } = usePopup();

  return (
    <Popover className="relative  focus:outline-none">
      {({ open, close }) => (
        <div>
          <Popover.Button
            ref={buttonRef}
            onMouseEnter={() => onOpen(open)}
            onMouseLeave={() => onClose(open, close)}
            className="w-full focus:outline-none "
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
              className=" absolute  w-72 -top-2.5 -left-1 -translate-x-full z-10     "
            >
              <div className=" p-[6px]  shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative h-full bg-searchFocus rounded-md  ">
                  {/* Options */}
                  <div className="h-full flex flex-col px-2 ">
                    <div className="w-full h-9 px-2 flex gap-2 items-end text-white ">
                      <h2 className="text-sm font-bold  h-full flex items-center">
                        Chuyển bài
                      </h2>
                      <div className="h-full flex items-center">
                        {" "}
                        <Plus />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 px-2 ">
                      <div className="w-full h-9  flex gap-2 items-end justify-between text-searchText opacity-90 hover:opacity-100 cursor-pointer">
                        <h2 className="text-xds h-full flex items-center ">
                          Chuyển bài mượt mà (Crossfade)
                        </h2>
                        <div className="h-full flex items-center">
                          <SwitchBox />
                        </div>
                      </div>
                      <div className="w-full h-9 flex flex-col gap-3  text-searchText">
                        <input
                          type="range"
                          className="h-1 w-full appearance-none bg-contentDesc overflow-hidden"
                        />
                        <div className="w-full text-center text-xds text-white font-semibold">
                          8 giây
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-9 px-2 flex flex-col  text-searchText gap-2 py-4">
                      <div className="flex items-end justify-between opacity-90 hover:opacity-100 cursor-pointer">
                        <h2 className="text-xds ">
                          Bỏ qua khoảng lặng (Gapless)
                        </h2>
                        <div className="h-full flex items-center">
                          <SwitchBox />
                        </div>
                      </div>
                      <span className="text-xx opacity-80">
                        Loại bỏ đoạn im lặng khi chuyển bài hát
                      </span>
                    </div>
                    <hr className="mx-2 mt-10 opacity-20 h-[2px]" />
                    <div className="w-full h-9 px-2  flex gap-2 items-end text-white">
                      <h2 className="text-sm font-bold">Chất lượng nhạc</h2>
                    </div>
                    <div className="w-full  px-2 gap-4 flex flex-col  text-searchText py-4">
                      <div className="flex items-end justify-between opacity-90 hover:opacity-100 cursor-pointer">
                        <RadioBox data="Thường (128 kbps)" />
                      </div>
                      <div className="flex items-end justify-between opacity-90 hover:opacity-100 cursor-pointer">
                        <RadioBox data="Cao (320 kbps)" />
                      </div>
                      <div className="flex items-end justify-between opacity-90 hover:opacity-100 cursor-pointer">
                        <RadioBox data="Lossless" div={Plus} />
                      </div>
                    </div>
                    <hr className="mx-2 mt-2 opacity-20 h-[2px]" />
                    <div className="w-full px-2 py-3   flex flex-col gap-2  text-white">
                      <h2 className="text-sm font-bold">Phát nhạc</h2>
                      <div className="flex items-end justify-between opacity-90 hover:opacity-100 cursor-pointer">
                        <h2 className="text-xds ">
                          Bỏ qua khoảng lặng (Gapless)
                        </h2>
                        <div className="h-full flex items-center">
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
function SwitchBox() {
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={cn(
        "relative inline-flex items-center h-3 w-5 shrink-0 cursor-pointer rounded-full  transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
        enabled ? "bg-login" : "bg-purple-400",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block h-2.5 leading-3 w-2.5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ",
          enabled ? "translate-x-2.5" : "translate-x-0",
        )}
      />
    </Switch>
  );
}

function RadioBox({
  data,
  div: Fragment,
}: {
  data: string;
  div?: () => JSX.Element;
}) {
  return (
    <ul className="w-full text-xds font-medium   text-white">
      <li className="w-full  dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label id="list-radio-license">{data}</label>
            {Fragment && <Fragment />}
          </div>
          <div className="w-3">
            <input
              id="list-radio-license"
              type="radio"
              value=""
              name="list-radio"
              className="relative float-left  mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-login checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-login checked:after:bg-login checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-login checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-login dark:checked:after:border-login dark:checked:after:bg-login dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-login dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
            />
          </div>
        </div>
      </li>
    </ul>
  );
}

function Plus() {
  return (
    <div className="w-8 h-3 bg-login rounded-sm font-extrabold  flex items-center justify-center ">
      <h4 className="tracking-wider text-xxxx"> PLUS</h4>
    </div>
  );
}
export default PlayModal;
export { SwitchBox, RadioBox, Plus };

