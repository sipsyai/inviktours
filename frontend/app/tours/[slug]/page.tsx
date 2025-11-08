import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTourBySlug, getGlobalSettings } from '@/lib/strapi';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentRenderer from '@/components/tour/ContentRenderer';
import AdventureDetailLayout from '@/components/adventure/AdventureDetailLayout';
import TourBookingWrapper from '@/components/tour/TourBookingWrapper';
import ShortsVideoPlayer from '@/components/tour/ShortsVideoPlayer';
import TourDateHeader from '@/components/tour/TourDateHeader';
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

      {/* Tour Date Header - Sticky */}
      <TourDateHeader tour={tour} />

      <main className="flex-1">
          {/* Tour Content Sections */}
          <ContentRenderer sections={tour.contentSections} />

          {/* Video Player (Shorts Format) */}
          {tour.adventure?.video && <ShortsVideoPlayer video={tour.adventure.video} />}

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
