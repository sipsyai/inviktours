import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTourBySlug, getGlobalSettings } from '@/lib/strapi';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentRenderer from '@/components/tour/ContentRenderer';
import AdventureDetailLayout from '@/components/adventure/AdventureDetailLayout';
import TourBookingWrapper from '@/components/tour/TourBookingWrapper';
import type { Adventure } from '@/types/adventure';

// Enable ISR with revalidation
export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    return {
      title: 'Tur Bulunamadı - Inviktours',
    };
  }

  return {
    title: `${tour.adventure?.title || 'Tur'} - Inviktours`,
    description: tour.adventure?.subtitle || 'Doğanın kalbine unutulmaz bir yolculuk',
  };
}

export default async function TourPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  const globalSettings = await getGlobalSettings();

  if (!tour || !tour.contentSections) {
    notFound();
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      <Navbar />
      <main className="flex-1">
          {/* Tour Content Sections */}
          <ContentRenderer sections={tour.contentSections} />

          {/* Tour-Specific Info (Tarih ve Fiyat) */}
          {(tour.startDate || tour.endDate || tour.price) && (
            <section className="px-4 py-12 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-900">
              <div className="mx-auto max-w-6xl">
                <div className="rounded-2xl bg-gradient-to-br from-[#111418] to-[#1c2127] p-8 shadow-xl">
                  <h2 className="mb-6 text-3xl font-bold text-white">Tur Bilgileri</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Tarih Bilgisi */}
                    {(tour.startDate || tour.endDate) && (
                      <div className="rounded-lg bg-[#1c2127] p-6">
                        <div className="mb-2 flex items-center gap-2">
                          <svg className="h-6 w-6 text-[#FFB800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <h3 className="text-lg font-semibold text-[#FFB800]">Tarih</h3>
                        </div>
                        <div className="text-white">
                          {tour.startDate && (
                            <p className="text-base">
                              <span className="text-gray-400">Başlangıç:</span>{' '}
                              <span className="font-semibold">
                                {new Date(tour.startDate).toLocaleDateString('tr-TR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </span>
                            </p>
                          )}
                          {tour.endDate && (
                            <p className="mt-1 text-base">
                              <span className="text-gray-400">Bitiş:</span>{' '}
                              <span className="font-semibold">
                                {new Date(tour.endDate).toLocaleDateString('tr-TR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Fiyat Bilgisi */}
                    {tour.price && (
                      <div className="rounded-lg bg-[#1c2127] p-6">
                        <div className="mb-2 flex items-center gap-2">
                          <svg className="h-6 w-6 text-[#FFB800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h3 className="text-lg font-semibold text-[#FFB800]">Fiyat</h3>
                        </div>
                        <p className="text-3xl font-bold text-white">
                          {tour.price.toLocaleString('tr-TR')} {tour.currency || 'TRY'}
                        </p>
                        <p className="mt-1 text-sm text-gray-400">Kişi başı</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Adventure Full Details */}
          {tour.adventure && (
            <AdventureDetailLayout adventure={tour.adventure as unknown as Adventure} />
          )}
        </main>
        <Footer />

        {/* Floating Booking Button & Modal */}
        <TourBookingWrapper
          tour={tour}
          bookingSettings={globalSettings?.bookingButtonSettings}
        />
    </div>
  );
}
