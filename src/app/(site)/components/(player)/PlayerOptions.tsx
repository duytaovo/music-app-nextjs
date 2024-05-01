'use client';
import Options from '@/components/Options';
import useFrame from '@/hooks/(player)/useFrame';
import usePlayer from '@/hooks/(player)/usePlayer';
import usePlaylist from '@/hooks/(player)/usePlaylist';
import useVolume from '@/hooks/(player)/useVolume';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import { GoTrash } from 'react-icons/go';
import { ImFilm } from 'react-icons/im';
import { LuVolume2, LuVolumeX } from 'react-icons/lu';
import { RiPlayListFill } from 'react-icons/ri';
import Input from './Input';
import Playlist from './Playlist';
import { cn } from '@/libs/utils';
const PlayerOptions = () => {
  const [show, setShow] = useState<boolean>(false);
  const { setFrame } = useFrame();
  const { showPlaylist, setShowPlaylist } = usePlaylist();
  const { currentSong, setContinue, setClear } = usePlayer();
  const { volume, mute, setMute } = useVolume();
  return (
    <div className="col-span-1  flex items-center gap-2 justify-end text-white">
      {/* Frame */}
      <div>
        <div
          onClick={() => {
            setFrame(true), setContinue(false);
          }}
          className={cn(
            'hidden md:flex w-8 h-8 hover:bg-playerFocus  rounded-full   items-center justify-center cursor-pointer',
          )}
        >
          {' '}
          <ImFilm
            size={18}
            title="MV"
          />
        </div>
      </div>
      {/* Volume */}
      <div>
        {' '}
        <div className="group relative hidden md:flex items-center gap-1">
          <div
            onClick={setMute}
            className={cn(
              'w-8 h-8 hover:bg-playerFocus  rounded-full  flex items-center justify-center cursor-pointer',
            )}
          >
            {mute || volume === 0 ? (
              <LuVolumeX
                size={20}
                title="Unmute"
              />
            ) : (
              <LuVolume2
                size={20}
                title="Mute"
              />
            )}
          </div>
          <div
            className={cn(
              'w-18 h-3 hidden lg:flex   p-2 rounded-sm  items-center justify-center absolute lg:static -left-3/4 -translate-y-full lg:translate-y-0 lg:group-hover:bg-transparent',
              'group-hover:bg-playerFocus group-hover:flex',
            )}
          >
            {' '}
            <Input />
          </div>
        </div>
      </div>
      {/* Barrier */}
      <div className="h-10 w-[1px] bg-playerFocus my-auto"></div>
      {/* Show Playlist */}
      <div className="text-white">
        <div
          onClick={setShowPlaylist}
          className={cn(
            'w-8 h-8 hover:bg-playerFocus  rounded-full  flex items-center justify-center cursor-pointer',
          )}
        >
          <RiPlayListFill
            className="cursor-pointer"
            size={20}
            title="Show list"
          />
        </div>
        {/* Playlist */}
        <section
          className={cn(
            'fixed z-10  top-0 right-0  h-[calc(100vh-90px)]   bg-playlistBackground overflow-hidden transition-all ease-linear  delay-150',
            showPlaylist ? 'w-72 px-3' : 'w-0',
          )}
        >
          {/* Heading */}
          <div className="py-3 flex items-center justify-end">
            <div className="relative w-3/4  flex justify-between">
              <h2 className="bg-[#6A6475] px-3 py-2 rounded-full text-xds font-medium">
                Danh sách phát
              </h2>
              <div
                onClick={() => setShow(!show)}
                className={cn(
                  '  items-center justify-center font-medium cursor-pointer w-9 h-9 rounded-full h  flex',
                )}
              >
                {' '}
                <Options className="w-8 h-8 bg-playerFocus" />
              </div>
              {show && (
                <div className="absolute right-0 bottom-0 translate-y-full  gap-2 text-xds bg-searchFocus rounded-md py-2 text-searchText ">
                  <div
                    onClick={setClear}
                    className="flex items-center gap-2 p-2  hover:bg-contentFocus cursor-pointer rounded-md"
                  >
                    {' '}
                    <GoTrash size={14} />
                    <h2>Xóa danh sách phát</h2>
                  </div>
                  {currentSong?.src && (
                    <Link
                      className="flex items-center gap-2 p-2 hover:bg-contentFocus cursor-pointer rounded-md"
                      href={currentSong?.src || '#'}
                      target="_blank"
                    >
                      {' '}
                      <AiOutlineDownload size={16} />
                      <h2>Tải bài hát hiện tại</h2>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Content */}
          <Playlist />
        </section>
      </div>
    </div>
  );
};
export default PlayerOptions;
