'use client';

import { useRef } from 'react';
import { getStrapiMediaUrl } from '@/lib/strapi';
import type { StrapiMedia } from '@/types/tour';

interface ShortsVideoPlayerProps {
  video: StrapiMedia;
}

export default function ShortsVideoPlayer({ video }: ShortsVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = getStrapiMediaUrl(video.url);

  if (!videoUrl) {
    return null;
  }

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <section className="px-4 py-12 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-center">
          {/* Shorts Format Video Player - Dikey Format (9:16) */}
          <div className="relative w-full max-w-[360px] bg-black rounded-2xl overflow-hidden shadow-2xl cursor-pointer">
            {/* 9:16 Aspect Ratio Container */}
            <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
              <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
                playsInline
                muted
                autoPlay
                loop
                preload="metadata"
                poster={video.formats?.thumbnail?.url ? getStrapiMediaUrl(video.formats.thumbnail.url) : undefined}
                onClick={handleVideoClick}
              >
                <source src={videoUrl} type="video/mp4" />
                Tarayıcınız video etiketini desteklemiyor.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
