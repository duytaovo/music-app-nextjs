//@ts-nocheck
'use client';
import Image from 'next/image';
import getPosition from '@/helpers/getPosition';
import usePopup from '@/hooks/(utils)/usePopup';
import useWindowSize from '@/hooks/(utils)/useWindowSize';
import { Popover, Transition } from '@headlessui/react';
import { cn } from '@/libs/utils';
import { Fragment, useState } from 'react';

import { StaticImageData } from 'next/image';

import bmw from '@/public/bmw.jpg';
import zalo from '@/public/zalo.svg';
import facebook from '@/public/facebook.svg';
import div from '@/public/div.svg';
interface PositionProps {
  height: number;
  width: number;
}
export interface ShareModalProps {
  children: React.ReactNode;
}

interface OptionsProps {
  icon: StaticImageData;
  label: string;
}

function ShareModal({ children }: ShareModalProps) {
  const { buttonRef, onClose, onOpen } = usePopup();

  const options: OptionsProps[] = getOptions();
  const size = useWindowSize();
  const [position, setPosition] = useState<PositionProps>({
    height: 0,
    width: 0,
  });

  const className = getPosition(position);

  return (
    <Popover className="w-full focus:outline-none ">
      {({ open, close }) => (
        <div className="relative w-full">
          <Popover.Button
            ref={buttonRef}
            onMouseEnter={(e) => {
              const width = (e.clientX * 100) / size.width;
              const height = (e.clientY * 100) / size.height;
              setPosition({ width, height });
              onOpen(open);
            }}
            onMouseLeave={() => {
              onClose(open, close);
            }}
            className="w-full relative  focus:outline-none cursor-pointer hover:bg-contentFocus"
          >
            {children}
          </Popover.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-50 "
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 "
            leave="transition ease-in  duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              onMouseEnter={(e) => {
                onOpen(open);
              }}
              onMouseLeave={() => {
                onClose(open, close);
              }}
              className={cn(
                className && 'absolute z-10 w-48  bg-searchFocus rounded-md',
                className && className,
              )}
            >
              <div className="flex flex-col gap-2 py-2">
                {/* Social Share */}
                <div className="flex flex-col  items-start text-searchText ">
                  {options.map((option) => (
                    <div
                      key={option.label}
                      className="flex gap-2  px-3 py-2 w-full hover:bg-contentFocus cursor-pointer"
                    >
                      <div className="w-4 h-4 rounded-full ">
                        <Image
                          alt="Social Icon"
                          src={option.icon || bmw}
                          className="w-4 h-4 bg-white rounded-full"
                        />
                      </div>
                      <span className="text-xds">{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  );
}

const getOptions = () => [
  {
    icon: facebook,
    label: 'Facebook',
  },
  {
    icon: zalo,
    label: 'Zalo',
  },
  {
    icon: div,
    label: 'Mã nhúng',
  },
];

export default ShareModal;
