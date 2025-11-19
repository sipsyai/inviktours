import { Metadata } from 'next';
import { getHomeContent, getToursForListing } from '@/lib/strapi';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedToursSection from '@/components/home/FeaturedToursSection';
import UpcomingToursSection from '@/components/home/UpcomingToursSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';
import type {
  HeroSection as HeroSectionType,
  StatsSection as StatsSectionType,
  FeaturedToursSection as FeaturedToursSectionType,
  FeaturesSection as FeaturesSectionType,
  CTASection as CTASectionType,
} from '@/types/home';

// Enable ISR with revalidation
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Inviktours - Doğanın Kalbine Unutulmaz Yolculuklar',
  description: 'Türkiye\'nin en güzel doğa rotalarında profesyonel rehberlik eşliğinde unutulmaz maceralar.',
};

export default async function HomePage() {
  const homeContent = await getHomeContent();
  const tours = await getToursForListing();

  // If no content from Strapi, show a message
  if (!homeContent || !homeContent.contentSections) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <Navbar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Ana Sayfa İçeriği Yükleniyor</h1>
              <p className="text-gray-600">Lütfen Strapi admin panelinden ana sayfa içeriğini oluşturun.</p>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />

        <main className="flex-1">
          {homeContent.contentSections
            .filter((section) => section.__component !== 'home.stats-section')
            .map((section) => {
              switch (section.__component) {
                case 'home.hero-section':
                  return (
                    <div key={`hero-${section.id}`}>
                      <HeroSection section={section as HeroSectionType} toursCount={tours.length} />
                      {/* Find and render stats section right after hero */}
                      {homeContent.contentSections
                        ?.find((s) => s.__component === 'home.stats-section')
                        && (
                          <div className="relative -mt-20 px-4 md:px-10 lg:px-40 flex flex-1 justify-center z-20">
                            <StatsSection
                              section={homeContent.contentSections.find((s) => s.__component === 'home.stats-section') as StatsSectionType}
                              toursCount={tours.length}
                            />
                          </div>
                        )
                      }
                      {/* Upcoming Tours Section */}
                      <UpcomingToursSection tours={tours} />
                    </div>
                  );

                case 'home.featured-tours-section':
                  return (
                    <FeaturedToursSection
                      key={`featured-tours-${section.id}`}
                      section={section as FeaturedToursSectionType}
                      tours={tours}
                    />
                  );

                case 'home.features-section':
                  return (
                    <FeaturesSection
                      key={`features-${section.id}`}
                      section={section as FeaturesSectionType}
                    />
                  );

                case 'home.cta-section':
                  return (
                    <CTASection
                      key={`cta-${section.id}`}
                      section={section as CTASectionType}
                    />
                  );

                default:
                  return null;
              }
            })}
        </main>

        <Footer />
      </div>
    </div>
  );
}
