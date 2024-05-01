import { getSongsByType } from "@/actions/getSongs";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { Song } from "../../../types";

type QueryFunctionType = () => Promise<Song[]>;

const useSong = (key: () => QueryKey, type: string, limit?: number) => {
  return useQuery<Song[] | string, Error>({
    queryKey: key(),
    queryFn: async () => (await getSongsByType(type, limit)) as Song[],
  });
};

export default useSong;

