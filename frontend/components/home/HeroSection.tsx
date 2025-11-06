import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMediaUrl } from '@/lib/strapi';
import type { HeroSection as HeroSectionType } from '@/types/home';

interface HeroSectionProps {
  section: HeroSectionType;
  toursCount?: number;
}

export default function HeroSection({ section }: HeroSectionProps) {
  const backgroundImageUrl = section.backgroundImage
    ? getStrapiMediaUrl(section.backgroundImage.url)
    : null;
  const heroVideoUrl = section.heroVideo
    ? getStrapiMediaUrl(section.heroVideo.url)
    : null;
  const overlayOpacity = section.overlayOpacity ?? 50;

  return (
    <div className="relative px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-20 md:py-32 overflow-hidden min-h-[600px] md:min-h-[700px]">
      {/* Background Image or Video */}
      {heroVideoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideoUrl} type="video/mp4" />
        </video>
      ) : backgroundImageUrl ? (
        <Image
          src={backgroundImageUrl}
          alt={section.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        // Fallback gradient if no media is provided
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background-light to-primary/5 dark:from-primary/5 dark:via-background-dark dark:to-primary/10" />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"
        style={{ opacity: overlayOpacity / 100 }}
      />

      {/* Background Pattern (subtle) */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 relative z-10">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="material-symbols-outlined text-primary text-sm">{section.badgeIcon}</span>
            <span className="text-primary text-sm font-medium">{section.badgeText}</span>
          </div>

          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-[-0.033em] max-w-4xl drop-shadow-2xl">
            {section.title}{' '}
            <span className="text-primary drop-shadow-lg">{section.highlightedText}</span>
          </h1>

          <p className="text-white/90 text-lg md:text-xl max-w-2xl drop-shadow-lg">
            {section.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href={section.primaryButtonUrl}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>{section.primaryButtonText}</span>
              <span className="material-symbols-outlined">{section.primaryButtonIcon}</span>
            </Link>
            <a
              href={section.secondaryButtonUrl}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-white/20 text-[#111811] rounded-xl font-bold text-lg hover:bg-white hover:border-white transition-all shadow-lg"
            >
              <span>{section.secondaryButtonText}</span>
              <span className="material-symbols-outlined">{section.secondaryButtonIcon}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
