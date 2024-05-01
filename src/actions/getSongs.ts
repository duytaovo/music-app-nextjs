import getArrSinger from "@/helpers/getArrSinger";
import axios from "axios";
import { Song } from "../../types";
const url = process.env.NEXT_PUBLIC_API_URL;
const songsLimit = 25;
/* export const params = {
   trending: 'trending',
   favorite: 'favorite',
   newMusic: 'new-music',
   topViews: 'top-views',
}; */
export const typeMusic = ["trending", "favorite", "new-music", "top-views"];
export async function getSongsByType(type: string, limit?: number) {
  const baseURL = `${url}/music/${type}`;
  try {
    const response = await axios.get(baseURL, {
      params: {
        _limit: limit || songsLimit,
        _page: Math.round(Math.random() * 10),
      },
    });

    const data = response.data.data.map((item: any) => ({
      singers: getArrSinger(item.name_singer),
      songName: item.name_music,
      category: item.category,
      src: item.src_music,
      image: item.image_music,
      duration: item.time_format,
      link: item.link_mv,
      favorites:
        item.favorite < 999
          ? item.favorite
          : item.favorite < 1000000
          ? Math.floor(item.favorite / 1000) + "K"
          : Math.floor(item.favorite / 1000000) + "M",
    }));

    return data;
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw new Error("Failed to fetch songs");
  }
}

export async function getSongsByWordSearch(query: string) {
  const baseURL = `${url}/search`;
  const response = await axios
    .get(baseURL, {
      params: {
        query,
        _limit: 10,
      },
    })
    .then((res) => {
      const data: Song = res.data.data.map((item: any) => {
        return {
          singers: item.name_singer
            .split(/,|ft.| x /)
            .map((name: string) => name.trim()),
          songName: item.name_music,
          category: item.category,
          src: item.src_music,
          image: item.image_music,
          duration: item.time_format,
          link: item.link_mv,
          favorites:
            item.favorite < 999
              ? item.favorite
              : item.favorite < 1000000
              ? Math.floor(item.favorite / 1000) + "K"
              : Math.floor(item.favorite / 1000000) + "M",
        };
      });
      return data;
    })
    .catch((err) => "Something went wrong");
  return response;
}

export type Slug = "/trending" | "/favorite" | "/new-music" | "/top-views";
interface getSongsProps {
  slug: Slug;
  params?: {
    _limit?: number;
    _page?: number;
    _type?: "million" | "billion";
  };
  pageParam: number;
}

export const LIMIT = 10;

const getInfiniteSongs = async ({ pageParam = 1, slug }: getSongsProps) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/music" + slug;
  const response = await axios
    .get(url, {
      params: {
        _limit: LIMIT,
        _page: pageParam,
      },
    })
    .then((res) => {
      if (res.data.data.length === 0) {
        return;
      }
      const data: Song[] = res.data.data.map((item: any) => {
        return {
          singers: getArrSinger(item.name_singer),
          songName: item.name_music,
          category: item.category,
          src: item.src_music,
          image: item.image_music,
          duration: item.time_format,
          link: item.link_mv,
          favorites:
            item.favorite < 999
              ? item.favorite
              : item.favorite < 1000000
              ? Math.floor(item.favorite / 1000) + "K"
              : Math.floor(item.favorite / 1000000) + "M",
        };
      });
      return data;
    })
    .catch((err) => {
      ("Something went wrong");
    });
  return response;
};
export default getInfiniteSongs;

