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
    <div className="px-10 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div key={video.id} className="flex flex-col items-center">
            <video src={video.url} autoPlay loop className="w-full h-auto" />

            <Link
              href={video.url}
              className="mt-2 bg-[#042E2D] w-full text-center text-white p-5 hover:opacity-75 transition"
            >
              {video.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
