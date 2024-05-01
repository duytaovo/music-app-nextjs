import axios from "axios";
const url = process.env.NEXT_PUBLIC_API_URL;
const singerLimit = 5;

export async function getSinger(name: string) {
  const baseURL = `${url}/music/get-singer-name`;
  const response = await axios
    .get(baseURL, {
      params: {
        _limit: singerLimit,
        _singer: name.trim(),
      },
    })
    .then((res) => {
      const data = res.data.data.map((item: any) => {
        return {
          singers: [item.name_singer],
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
      if (typeof err.response.data.message === "string")
        return "Music not found";
    });
  return response;
}

