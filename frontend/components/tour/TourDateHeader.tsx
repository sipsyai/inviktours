'use client';

import { useEffect, useState } from 'react';
import { Tour } from '@/types/tour';

interface TourDateHeaderProps {
  tour: Tour;
}

export default function TourDateHeader({ tour }: TourDateHeaderProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const dateRange = formatDateRange();
  const duration = calculateDuration();

  if (!dateRange) return null;

  return (
    <div
      className={`transition-all duration-300 sticky top-[49px] md:top-[64px] z-40 ${
        isSticky
          ? 'bg-white/95 dark:bg-background-dark/95 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20'
      }`}
    >
      <div className="px-4 md:px-10 lg:px-40 transition-all duration-300">
        <div
          className={`flex items-center justify-center ${
            isSticky ? 'py-3' : 'py-6'
          } transition-all duration-300`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">
              calendar_today
            </span>
            <span
              className={`text-[#111811] dark:text-white font-semibold ${
                isSticky ? 'text-base' : 'text-lg'
              }`}
            >
              {dateRange}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
