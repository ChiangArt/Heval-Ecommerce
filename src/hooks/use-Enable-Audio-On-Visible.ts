import { useEffect, RefObject } from "react";

export function useEnableAudioOnVisible(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = false;
          video.play().catch(() => {});
        } else {
          video.muted = true;
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => {
      if (video) observer.unobserve(video);
    };
  }, [videoRef]);
}
