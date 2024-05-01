/* eslint-disable react-hooks/exhaustive-deps */

const useWindowSize = () => {
  let width = typeof window !== "undefined" && window?.innerWidth;
  let height = typeof window !== "undefined" && window?.innerHeight;
  return { width, height };
};

export default useWindowSize;

