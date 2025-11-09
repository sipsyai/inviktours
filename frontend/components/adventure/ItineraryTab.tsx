import { Adventure } from '@/types/adventure';
import ItineraryDayCard from './ItineraryDayCard';

interface ItineraryTabProps {
  adventure: Adventure;
}

export default function ItineraryTab({ adventure }: ItineraryTabProps) {
  if (!adventure.itinerary || adventure.itinerary.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="material-symbols-outlined text-6xl text-[#638863] dark:text-gray-400 mb-4">
          event_note
        </span>
        <h3 className="text-[#111811] dark:text-white text-xl font-bold mb-2">
          Program Bilgisi Bulunamadı
        </h3>
        <p className="text-[#638863] dark:text-gray-400">
          Bu macera için henüz detaylı program bilgisi eklenmemiş.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Day Navigation */}
      <div className="bg-white dark:bg-background-dark py-4 border-b border-gray-200 dark:border-gray-800 -mx-4 px-4 md:-mx-10 md:px-10 lg:-mx-40 lg:px-40">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <strong className="text-[#111811] dark:text-white mr-2 whitespace-nowrap">Gün:</strong>
            {adventure.itinerary.map((day) => (
              <a
                key={day.id}
                href={`#day-${day.dayNumber}`}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white dark:hover:bg-primary text-[#111811] dark:text-white rounded-md transition-colors whitespace-nowrap"
              >
                {day.dayRange || day.dayNumber}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Itinerary Days */}
      <div className="space-y-8">
        <h2 className="text-[#111811] dark:text-white text-2xl font-bold">
          Program Detayı
        </h2>
        {adventure.itinerary.map((day) => (
          <ItineraryDayCard key={day.id} day={day} />
        ))}
      </div>
    </div>
  );
}
