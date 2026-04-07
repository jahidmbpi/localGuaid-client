"use client";
export default function Banner() {
  return (
    <div className="relative h-[90vh] w-full">
      <video
        src="/banner.mp4"
        autoPlay
        loop
        muted
        playsInline
        onLoadedMetadata={(e) => (e.currentTarget.playbackRate = 0.2)}
        className="absolute inset-0 object-cover h-full w-full"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className=" relative z-10 flex h-full items-center justify-center text-white text-center">
        <div className="max-w-4xl space-y-2 md:space-y-4  px-2">
          <h2 className="text-[18px] md:text-2xl bg-[#2f4551] py-1 rounded-full inline-block px-4">
            Adventure Awaits
          </h2>
          <h1 className="text-5xl font-bold">EXPLORE THE WORLD</h1>
          <p className=" text-sm font-normal font-sans hidden md:block">
            Welcome to LocalGuaid! Here, you’ll discover the city’s most popular
            attractions, experience the local culture, and enjoy the flavors of
            authentic local cuisine. Start your next adventure with our guide –
            because the real experience begins with the locals!
          </p>
          <p className="md:hidden text-sm font-normal font-sans">
            Welcome to LocalGuaid! Explore top attractions, savor local flavors,
            and experience true local culture. Your real adventure starts here!
          </p>
          <div className="relative flex w-[70%] md:w-[50%] items-center justify-center mx-auto mt-5 md:mt-8">
            <input
              className=" border border-gray-300 p-2 md:p-3 rounded-md w-full "
              type="text"
              placeholder="Where are you go ?"
            />
            <div className="absolute right-0 pr-2">
              <button className=" border p-1 px-2 rounded-sm bg-white text-black">
                search
              </button>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center mt-6">
            <h2 className="bg-[#2f4551] inline-block px-2 rounded-sm text-sm font-sans">
              Mountain
            </h2>
            <h2 className="bg-[#2f4551] inline-block px-2 rounded-sm text-sm font-sans">
              Hiking
            </h2>{" "}
            <h2 className="bg-[#2f4551] inline-block px-2 rounded-sm text-sm font-sans">
              Food
            </h2>{" "}
            <h2 className="bg-[#2f4551] inline-block px-2 rounded-sm text-sm font-sans">
              Camping
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
