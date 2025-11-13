import { ItineraryDay } from '@/types/adventure';
import { getStrapiMediaUrl } from '@/lib/strapi';
import Image from 'next/image';

interface ItineraryDayCardProps {
  day: ItineraryDay;
}

export default function ItineraryDayCard({ day }: ItineraryDayCardProps) {
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
          <div className="grid grid-cols-2 gap-3">
            {day.images.map((image) => (
              <div
                key={image.id}
                className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
              >
                <Image
                  src={getStrapiMediaUrl(image.url)}
                  alt={image.alternativeText || `Gün ${day.dayNumber} fotoğrafı`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
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
    </div>
  );
}
