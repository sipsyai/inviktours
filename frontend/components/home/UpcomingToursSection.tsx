import Link from 'next/link';
import Image from 'next/image';
import { TourCard } from '@/types/tour';
import { getStrapiMediaUrl } from '@/lib/strapi';

interface UpcomingToursSectionProps {
  tours: TourCard[];
}

export default function UpcomingToursSection({ tours }: UpcomingToursSectionProps) {
  // Filter tours that have future dates
  const upcomingTours = tours
    .filter(tour => {
      if (!tour.startDate) return false;
      const startDate = new Date(tour.startDate);
      return startDate > new Date();
    })
    .sort((a, b) => {
      const dateA = new Date(a.startDate!);
      const dateB = new Date(b.startDate!);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 6); // Show max 6 tours

  if (upcomingTours.length === 0) {
    return null;
  }

  return (
    <section className="px-4 md:px-10 lg:px-40 py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#111811] dark:text-white mb-4">
            Güncel Turlarımız
          </h2>
          <p className="text-lg text-[#638863] dark:text-gray-400 max-w-2xl mx-auto">
            Yaklaşan turlarımıza göz atın ve yerinizi ayırtın
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingTours.map((tour) => (
              <Link
                key={tour.id}
                href={`/tours/${tour.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {tour.heroImage ? (
                    <Image
                      src={getStrapiMediaUrl(tour.heroImage.url)}
                      alt={tour.title || 'Tour'}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-green-600" />
                  )}

                  {/* Price Badge */}
                  {tour.price && (
                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-lg">
                      <span className="text-primary font-bold">
                        {tour.price.toLocaleString('tr-TR')} {tour.currency || 'TRY'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#111811] dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {tour.title || 'Tur'}
                  </h3>

                  {/* Dates */}
                  <div className="flex items-center gap-2 text-sm text-[#638863] dark:text-gray-400 mb-3">
                    <span className="material-symbols-outlined text-lg">calendar_month</span>
                    <span>
                      {tour.startDate && new Date(tour.startDate).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* Duration */}
                  {tour.startDate && tour.endDate && (
                    <div className="flex items-center gap-2 text-sm text-[#638863] dark:text-gray-400 mb-4">
                      <span className="material-symbols-outlined text-lg">schedule</span>
                      <span>
                        {Math.ceil((new Date(tour.endDate).getTime() - new Date(tour.startDate).getTime()) / (1000 * 60 * 60 * 24))} Gün
                      </span>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    <span>Detayları Gör</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </div>
                </div>
              </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <span>Tüm Turları Gör</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
