//@ts-nocheck
'use client';
import getPosition from '@/helpers/getPosition';
import usePopup from '@/hooks/(utils)/usePopup';
import useWindowSize from '@/hooks/(utils)/useWindowSize';
import { Popover, Transition } from '@headlessui/react';
import { cn } from '@/libs/utils';
import { Fragment, useState } from 'react';

interface PositionProps {
  height: number;
  width: number;
}
export interface SongDetailModalProps {
  children: React.ReactNode;
}

interface InfoProps {
  label: string;
  detail: string;
}

function SongDetailModal({ children }: SongDetailModalProps) {
  const { buttonRef, onClose, onOpen } = usePopup();

  const infos: InfoProps[] = getInfo();
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
            className="w-full relative  hover:bg-contentFocus focus:outline-none rounded-t-md"
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
                <div className="flex flex-col  items-start text-searchText gap-2">
                  {infos.map((info) => (
                    <div
                      key={info.label}
                      className="flex flex-col  px-3 "
                    >
                      <span className="uppercase text-contentDesc text-xx">
                        {info.label}
                      </span>
                      <span className="text-xds text-white">{info.detail}</span>
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

const getInfo = () => [
  {
    label: 'Nghệ sĩ',
    detail: 'Artist',
  },
  {
    label: 'Album',
    detail: 'Album',
  },
  {
    label: 'Sáng tác',
    detail: 'composer',
  },
  {
    label: 'Thể loại',
    detail: 'Music',
  },
  {
    label: 'Cung cấp bởi',
    detail: 'Source',
  },
];

export default SongDetailModal;
