"use client";
import React, { useEffect } from "react";

export default function MediaVideos() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TikTok Video */}
        <div className="flex flex-col items-center">
          <blockquote
            className="tiktok-embed"
            cite="https://www.tiktok.com/@scout2015/video/7360038628120792346"
            data-video-id="7360038628120792346"
            style={{ width: "100%", maxWidth: "325px", height: "574px" }}
          >
            <section>Loading...</section>
          </blockquote>
          <a
            href="https://www.tiktok.com/@scout2015/video/7360038628120792346"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Ver en TikTok
          </a>
        </div>

        {/* YouTube Video 1 */}
        <div className="flex flex-col items-center">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&rel=0&showinfo=0"
            title="YouTube"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-[315px] rounded-lg"
          ></iframe>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Ver en YouTube
          </a>
        </div>

        {/* YouTube Video 2 */}
        <div className="flex flex-col items-center">
          <iframe
            src="https://www.youtube.com/embed/3JZ_D3ELwOQ?autoplay=1&mute=1&controls=0&rel=0&showinfo=0"
            title="YouTube"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-[315px] rounded-lg"
          ></iframe>
          <a
            href="https://www.youtube.com/watch?v=3JZ_D3ELwOQ"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Ver en YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
