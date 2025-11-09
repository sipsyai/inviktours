import Image from 'next/image';
import { Adventure } from '@/types/adventure';
import { getStrapiMediaUrl } from '@/lib/strapi';
import TripAttributesSection from './TripAttributesSection';
import ContentRenderer from './ContentRenderer';

interface OverviewTabProps {
  adventure: Adventure;
}

export default function OverviewTab({ adventure }: OverviewTabProps) {
  return (
    <div className="flex flex-col gap-12">
      {/* Description */}
      {adventure.description && (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div
            className="text-[#111811] dark:text-white leading-relaxed"
            dangerouslySetInnerHTML={{ __html: adventure.description }}
          />
        </div>
      )}

      {/* Trip Attributes Section */}
      {(adventure.tripAttributes || adventure.tripInfo) && (
        <div>
          <h2 className="text-[#111811] dark:text-white text-2xl font-bold mb-6">
            Bu tur sizin için mi?
          </h2>
          <TripAttributesSection
            attributes={adventure.tripAttributes}
            info={adventure.tripInfo}
          />
        </div>
      )}

      {/* Gallery */}
      {adventure.images && adventure.images.length > 0 && (
        <div>
          <h2 className="text-[#111811] dark:text-white text-2xl font-bold mb-6">
            {adventure.title} Galerisi
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {adventure.images.slice(0, 5).map((image, index) => (
              <div
                key={image.id || index}
                className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
              >
                <Image
                  src={getStrapiMediaUrl(image.url)}
                  alt={image.alternativeText || `${adventure.title} - ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {index === 4 && adventure.images && adventure.images.length > 5 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      +{adventure.images.length - 5}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Short Itinerary Preview */}
      {adventure.itinerary && adventure.itinerary.length > 0 && (
        <div>
          <h2 className="text-[#111811] dark:text-white text-2xl font-bold mb-6">
            Program Özeti
          </h2>
          <div className="space-y-4">
            {adventure.itinerary.map((day) => (
              <div
                key={day.id}
                className="border-l-4 border-primary pl-4 py-2"
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <a
                    href={`#day-${day.dayNumber}`}
                    className="text-primary font-bold hover:underline hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    Gün {day.dayNumber}{day.dayRange ? ` - ${day.dayRange}` : ''}
                  </a>
                  <span className="text-[#638863] dark:text-gray-400 font-medium">
                    {day.location}
                  </span>
                </div>
                <p className="text-[#111811] dark:text-white">{day.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Content Sections (excluding pricing-section) */}
      {adventure.contentSections && adventure.contentSections.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="text-sm text-[#638863] dark:text-gray-400 mb-4">
            Ek İçerikler
          </div>
          <div className="space-y-8">
            {adventure.contentSections
              .filter(section => section.__component !== 'adventure.pricing-section')
              .map((section) => (
                <ContentRenderer key={section.id} section={section} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
