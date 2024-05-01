import { getSinger } from "@/actions/getSinger";
import { artist } from "@/store/queryKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Song } from "../../../types";

const useSinger = (name: string) => {
  const queryClient = useQueryClient();

  const query = useQuery<Song[]>({
    queryKey: artist.artist(name),
    queryFn: () => getSinger(name),
  });

  // Reacting to onSuccess
  const { data } = query;
  if (data) {
    queryClient.setQueryData([artist.artist(name)], data);
  }

  return query;
};

export default useSinger;

