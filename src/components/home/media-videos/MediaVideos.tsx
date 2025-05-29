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
    <div className="max-w-screen-xl mx-auto px-4 py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex flex-col h-full w-full overflow-hidden"
          >
            <video src={video.url} autoPlay loop className="w-full h-120 object-cover"/>

            <Link
              href={video.url}
              className="mt-2 bg-[#042E2D] text-white text-center text-sm sm:text-base font-semibold py-3 hover:opacity-80 transition"
            >
              {video.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
