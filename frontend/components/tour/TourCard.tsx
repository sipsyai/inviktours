import Link from 'next/link';
import { TourCard as TourCardType } from '@/types/tour';
import { getStrapiMediaUrl } from '@/lib/strapi';

interface TourCardProps {
  tour: TourCardType;
}

export default function TourCard({ tour }: TourCardProps) {
  const formatPrice = (price: number) => new Intl.NumberFormat('tr-TR').format(price);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatDateRange = () => {
    if (!tour.startDate || !tour.endDate) return null;

    const start = new Date(tour.startDate);
    const end = new Date(tour.endDate);

    const startDay = start.getDate();
    const endDay = end.getDate();
    const month = start.toLocaleDateString('tr-TR', { month: 'long' });
    const year = start.getFullYear();

    // Aynı ay içindeyse: "15-20 Haziran 2024"
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${startDay}-${endDay} ${month} ${year}`;
    }

    // Farklı aylardaysa: "28 Haziran - 3 Temmuz 2024"
    const endMonth = end.toLocaleDateString('tr-TR', { month: 'long' });
    if (start.getFullYear() === end.getFullYear()) {
      return `${startDay} ${month} - ${endDay} ${endMonth} ${year}`;
    }

    // Farklı yıllardaysa: "28 Aralık 2024 - 3 Ocak 2025"
    const endYear = end.getFullYear();
    return `${startDay} ${month} ${year} - ${endDay} ${endMonth} ${endYear}`;
  };

  const calculateDuration = () => {
    if (!tour.startDate || !tour.endDate) return null;
    const start = new Date(tour.startDate);
    const end = new Date(tour.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const duration = calculateDuration();
  const backgroundImage = tour.heroImage
    ? getStrapiMediaUrl(tour.heroImage.url)
    : '/images/placeholder-tour.jpg';

  return (
    <div className="group flex flex-col rounded-xl overflow-hidden border border-[#dce5dc] dark:border-gray-700 bg-white dark:bg-background-dark/50 hover:shadow-lg transition-all duration-300">
      {/* Trip Title */}
      <div className="px-6 pt-6 pb-3">
        <Link href={`/tours/${tour.slug}`}>
          <h3 className="text-[#111811] dark:text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors cursor-pointer hover:underline">
            {tour.title}
          </h3>
        </Link>
      </div>

      {/* Tour Image with Background */}
      <div
        className="relative h-72 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Tour Info */}
      <div className="flex flex-col flex-1 p-6 pt-4">

        {/* Duration and Date in Single Row */}
        {(duration || formatDateRange()) && (
          <div className="flex items-center gap-4 text-sm mb-4 flex-wrap">
            {duration && (
              <div className="flex items-center gap-1.5 text-[#638863] dark:text-gray-400">
                <span className="material-symbols-outlined text-base">schedule</span>
                <span className="font-medium">{duration} Gün</span>
              </div>
            )}
            {formatDateRange() && (
              <div className="flex items-center gap-1.5 text-[#638863] dark:text-gray-400">
                <span className="material-symbols-outlined text-base">calendar_today</span>
                <span className="font-medium">{formatDateRange()}</span>
              </div>
            )}
          </div>
        )}

        {/* Price */}
        {tour.price && (
          <div className="flex flex-col mt-auto pt-4 border-t border-[#dce5dc] dark:border-gray-700">
            <span className="text-[#638863] dark:text-gray-400 text-xs mb-1">Kişi Başı</span>
            <div className="text-primary font-bold text-2xl mb-4">
              {formatPrice(tour.price)} {tour.currency || 'TRY'}
            </div>
          </div>
        )}

        {/* CTA Button - Full Width */}
        <Link
          href={`/tours/${tour.slug}`}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-sm text-center w-full block mt-2"
        >
          Detayları Gör
        </Link>
      </div>
    </div>
  );
}
