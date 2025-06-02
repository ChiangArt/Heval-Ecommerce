import Link from "next/link";
import React from "react";

interface Video {
  id: string;
  url: string;
  title: string;
}

interface MediaVideosProps {
  videos: Video[];
}

export default function MediaVideos({ videos }: MediaVideosProps) {
  return (
    <div className="h-[calc(100vh-210px)] landscape:lg:h-[75%] landscape:xl:h-[80%] px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 h-[97%]">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex flex-col w-full h-full overflow-hidden"
          >
            <video
              src={video.url}
              autoPlay
              loop
              muted
              className="w-full h-full landscape:lg:h-[80%] landscape:xl:h-[90%] object-cover rounded"
            />

            <Link
              href={video.url}
              className="mt-2 bg-secundario text-white text-center text-sm sm:text-base font-semibold py-3 hover:opacity-80 transition"
            >
              {video.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
