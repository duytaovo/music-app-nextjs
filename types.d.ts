import { StaticImageData } from "next/image";
export interface Song {
  singers: string[];
  songName: string;
  category: string;
  src: string;
  image: StaticImageData;
  duration: string;
  link: string;
  favorites: number | string;
}

export interface List {
  data: Song[];
  thumbnails: Thumbnail;
}

export interface Thumbnail {
  image: StaticImageData;
  title: string;
  singers: string[];
  song: Song;
  favorites: number | string;
}

export interface BtnPlay {
  show?: boolean;
  circle?: boolean;
  isPlay?: boolean;
  isLoad?: boolean;
  size?: number;
  active?: boolean;
}

