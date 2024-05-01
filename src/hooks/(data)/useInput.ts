// import { getSongsByWordSearch } from "@/actions/getSongs";
import { getSongsByWordSearch } from "@/actions/getSongs";
import { useQuery } from "@tanstack/react-query";

const useInput = (key: string[]) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => await getSongsByWordSearch(key[2]),
    enabled: !!key,
  });
};
export default useInput;

