export const Loading = () => {
  return (
    <div
      className="               
             w-full h-36
             md:w-full md:h-40
             lg:w-full lg:h-44
             xl:w-full xl:h-46
             2xl:w-full 2xl:h-46 overflow-hidden"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 shadow">
        {Array.from({ length: 5 }).map((x, index) => (
          <div className="" key={index}>
            <div
              className="animate-pulse rounded-md bg-slate-600     
                   w-36 h-36
                   md:w-40 md:h-40
                   lg:w-44 lg:h-44
                   xl:w-46 xl:h-46
                   2xl:w-46 2xl:h-46"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;

