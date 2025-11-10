'use client';

import Link from 'next/link';
import { Tour } from '@/types/tour';
import { useMemo } from 'react';

interface DeparturesSectionProps {
  tours?: Tour[];
  onBookingClick?: (tour: Tour) => void;
}

export default function DeparturesSection({ tours, onBookingClick }: DeparturesSectionProps) {
  const formatPrice = (price: number) => new Intl.NumberFormat('tr-TR').format(price);

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

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

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  // Filter upcoming tours and sort by start date
  const upcomingTours = useMemo(() => {
    if (!tours || tours.length === 0) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tours
      .filter(tour => {
        if (!tour.startDate) return false;
        const startDate = new Date(tour.startDate);
        return startDate >= today;
      })
      .sort((a, b) => {
        if (!a.startDate || !b.startDate) return 0;
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      });
  }, [tours]);

  // Empty state
  if (upcomingTours.length === 0) {
    return (
      <div className="bg-gradient-to-br from-sand-50 to-white dark:from-background-dark/30 dark:to-background-dark/50 rounded-xl p-8 border border-sand-200 dark:border-gray-700">
        <h2 className="text-2xl md:text-3xl font-bold text-earth-900 dark:text-white mb-6">
          Kalkış Tarihleri
        </h2>
        <p className="text-earth-600 dark:text-gray-400 text-center py-8">
          Şu anda planlanmış tur bulunmamaktadır.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-sand-50 to-white dark:from-background-dark/30 dark:to-background-dark/50 rounded-xl p-6 md:p-8 border border-sand-200 dark:border-gray-700">
      <h2 className="text-2xl md:text-3xl font-bold text-earth-900 dark:text-white mb-6">
        Kalkış Tarihleri
      </h2>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-sand-300 dark:border-gray-600">
              <th className="text-left py-4 px-4 text-sm font-semibold text-earth-700 dark:text-gray-300 uppercase tracking-wide">
                Tarih Aralığı
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-earth-700 dark:text-gray-300 uppercase tracking-wide">
                Süre
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-earth-700 dark:text-gray-300 uppercase tracking-wide">
                Fiyat
              </th>
              <th className="text-right py-4 px-4 text-sm font-semibold text-earth-700 dark:text-gray-300 uppercase tracking-wide">

              </th>
            </tr>
          </thead>
          <tbody>
            {upcomingTours.map((tour, index) => {
              if (!tour.startDate || !tour.endDate) return null;

              const dateRange = formatDateRange(tour.startDate, tour.endDate);
              const duration = calculateDuration(tour.startDate, tour.endDate);

              return (
                <tr
                  key={tour.id}
                  className={`border-b border-sand-200 dark:border-gray-700 hover:bg-sand-100/50 dark:hover:bg-gray-800/30 transition-colors ${
                    index === upcomingTours.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-earth-800 dark:text-gray-200">
                      <span className="material-symbols-outlined text-earth-600 dark:text-gray-400 text-xl">
                        calendar_today
                      </span>
                      <span className="font-medium">{dateRange}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-earth-800 dark:text-gray-200">
                      <span className="material-symbols-outlined text-earth-600 dark:text-gray-400 text-xl">
                        schedule
                      </span>
                      <span className="font-medium">{duration} Gün</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-primary dark:text-primary-light font-bold text-lg">
                      {tour.price ? `${formatPrice(tour.price)} ${tour.currency || 'TRY'}` : '-'}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    {onBookingClick ? (
                      <button
                        onClick={() => onBookingClick(tour)}
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:shadow-md"
                      >
                        <span>Rezervasyon Yap</span>
                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                      </button>
                    ) : (
                      <Link
                        href={`/tours/${tour.slug}`}
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:shadow-md"
                      >
                        <span>Rezervasyon Yap</span>
                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {upcomingTours.map((tour) => {
          if (!tour.startDate || !tour.endDate) return null;

          const dateRange = formatDateRange(tour.startDate, tour.endDate);
          const duration = calculateDuration(tour.startDate, tour.endDate);

          return (
            <div
              key={tour.id}
              className="bg-white dark:bg-gray-800/50 rounded-lg p-5 border border-sand-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              {/* Date Range */}
              <div className="flex items-center gap-2 text-earth-800 dark:text-gray-200 mb-3">
                <span className="material-symbols-outlined text-earth-600 dark:text-gray-400 text-xl">
                  calendar_today
                </span>
                <span className="font-medium">{dateRange}</span>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 text-earth-800 dark:text-gray-200 mb-3">
                <span className="material-symbols-outlined text-earth-600 dark:text-gray-400 text-xl">
                  schedule
                </span>
                <span className="font-medium">{duration} Gün</span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="text-primary dark:text-primary-light font-bold text-xl">
                  {tour.price ? `${formatPrice(tour.price)} ${tour.currency || 'TRY'}` : '-'}
                </div>
                <span className="text-earth-600 dark:text-gray-400 text-sm">Kişi Başı</span>
              </div>

              {/* Button */}
              {onBookingClick ? (
                <button
                  onClick={() => onBookingClick(tour)}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 w-full"
                >
                  <span>Rezervasyon Yap</span>
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
              ) : (
                <Link
                  href={`/tours/${tour.slug}`}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 w-full"
                >
                  <span>Rezervasyon Yap</span>
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
