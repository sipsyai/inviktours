'use client';

import { ItineraryDay } from '@/types/adventure';
import { getStrapiMediaUrl } from '@/lib/strapi';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ItineraryDayCardProps {
  day: ItineraryDay;
}

export default function ItineraryDayCard({ day }: ItineraryDayCardProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    if (day.images && selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % day.images.length);
    }
  };

  const goToPrevious = () => {
    if (day.images && selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? day.images.length - 1 : selectedImage - 1
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, day.images]);

  return (
    <div
      id={`day-${day.dayNumber}`}
      className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 scroll-mt-32"
    >
      {/* Header */}
      <div className="flex items-baseline gap-3 mb-3">
        <h3 className="text-primary text-lg font-bold">
          Gün {day.dayNumber}{day.dayRange && ` - ${day.dayRange}`}
        </h3>
        <span className="text-[#111811] dark:text-white font-semibold">
          {day.location}
        </span>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <p className="text-[#111811] dark:text-white text-base leading-relaxed">
          {day.summary}
        </p>
      </div>

      {/* Details */}
      {day.details && (
        <div className="mb-4 prose dark:prose-invert max-w-none">
          <div
            className="text-[#638863] dark:text-gray-400 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: day.details }}
          />
        </div>
      )}

      {/* Images */}
      {day.images && day.images.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-3 md:w-[60%]">
            {day.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => openLightbox(index)}
                className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer hover:opacity-90 transition-opacity group"
              >
                <Image
                  src={getStrapiMediaUrl(image.url)}
                  alt={image.alternativeText || `Gün ${day.dayNumber} fotoğrafı`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 15vw"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                <span className="material-symbols-outlined absolute top-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">
                  zoom_in
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Activities */}
      {day.activities && day.activities.length > 0 && (
        <div className="mb-4">
          <h4 className="text-[#111811] dark:text-white font-semibold mb-2 text-sm">
            Aktiviteler:
          </h4>
          <div className="space-y-2">
            {day.activities.map((activity) => (
              <div
                key={activity.id}
                className={`flex items-start gap-2 text-sm ${
                  activity.isOptional
                    ? 'text-[#638863] dark:text-gray-400'
                    : 'text-[#111811] dark:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-base mt-0.5">
                  {activity.icon}
                </span>
                <div className="flex-1">
                  <span className="font-medium">{activity.name}</span>
                  {activity.isOptional && (
                    <span className="ml-2 text-xs italic">(Opsiyonel)</span>
                  )}
                  {activity.description && (
                    <p className="text-xs mt-1">{activity.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer: Meals & Accommodation */}
      <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        {day.meals && (
          <div className="flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-primary">restaurant</span>
            <span className="text-[#638863] dark:text-gray-400">Öğünler:</span>
            <span className="text-[#111811] dark:text-white font-medium">{day.meals}</span>
          </div>
        )}

        {day.accommodation && (
          <div className="flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-primary">hotel</span>
            <span className="text-[#638863] dark:text-gray-400">Konaklama:</span>
            <span className="text-[#111811] dark:text-white font-medium">
              {day.accommodation}
            </span>
          </div>
        )}
      </div>

      {day.accommodationDetails && (
        <div className="mt-2 text-xs text-[#638863] dark:text-gray-400 italic">
          {day.accommodationDetails}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage !== null && day.images && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Kapat"
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>

          {/* Previous Button */}
          {day.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Önceki"
            >
              <span className="material-symbols-outlined text-5xl">
                chevron_left
              </span>
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getStrapiMediaUrl(day.images[selectedImage].url)}
              alt={
                day.images[selectedImage].alternativeText ||
                `Gün ${day.dayNumber} fotoğrafı ${selectedImage + 1}`
              }
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next Button */}
          {day.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Sonraki"
            >
              <span className="material-symbols-outlined text-5xl">
                chevron_right
              </span>
            </button>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
            {selectedImage + 1} / {day.images.length}
          </div>
        </div>
      )}
    </div>
  );
}
