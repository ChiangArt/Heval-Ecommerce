import Link from "next/link";
import React from "react";

const videos = [
  {
    id: "7360038628120792346",
    url: "/WhatsApp Video 2025-05-21 at 7.16.22 PM.mp4",
    title: "SÍGUENOS EN TIK TOK",
  },
  {
    id: "7357224721908249857",
    url: "/WhatsApp Video 2025-05-21 at 7.16.22 PM (2).mp4",
    title: "SÍGUENOS EN FACEBOOK",
  },
  {
    id: "7355124855013305601",
    url: "/WhatsApp Video 2025-05-21 at 7.21.04 PM.mp4",
    title: "SÍGUENOS EN INSTAGRAM",
  },
];

export default function MediaVideos() {
  return (
    <div className="px-10 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div key={video.id} className="flex flex-col items-center">
            <video
              src={video.url}
              autoPlay
              loop
              className="w-full h-auto"
            />

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
