'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Adventure } from '@/types/adventure';
import { getStrapiMediaUrl } from '@/lib/strapi';
import OverviewTab from './OverviewTab';
import ItineraryTab from './ItineraryTab';
import RequirementsSection from './RequirementsSection';
import ContentRenderer from './ContentRenderer';

interface AdventureDetailLayoutProps {
  adventure: Adventure;
}

type Section = 'overview' | 'itinerary' | 'requirements' | 'pricing';

export default function AdventureDetailLayout({ adventure }: AdventureDetailLayoutProps) {
  const [activeSection, setActiveSection] = useState<Section>('overview');

  // Scroll to section smoothly
  const scrollToSection = useCallback((sectionId: Section) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Navbar (~60-64px) + TourDateHeader (~48px) + Tab navigation (~68px) = ~180px
      const offset = 180;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  // Handle hash navigation for itinerary days
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      // If hash is for a specific day (e.g., #day-1), scroll to itinerary first, then to the day
      if (hash.startsWith('#day-')) {
        // First scroll to itinerary section
        scrollToSection('itinerary');

        // Then scroll to the specific day after a short delay
        setTimeout(() => {
          const dayElement = document.getElementById(hash.substring(1));
          if (dayElement) {
            // Account for sticky headers: navbar + date header + tab nav + day nav = ~240px
            const offset = 240;
            const elementPosition = dayElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }, 300);
      }
    };

    // Handle initial hash on page load
    if (window.location.hash.startsWith('#day-')) {
      handleHashChange();
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [scrollToSection]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections: Section[] = ['overview', 'itinerary', 'requirements', 'pricing'];
      // Account for navbar + TourDateHeader + tab nav height
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Title Block */}
      <div className="px-4 md:px-10 lg:px-40 py-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-[#111811] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] mb-2">
                {adventure.title}
              </h1>
              {adventure.tripSummary && (
                <div
                  className="text-[#638863] dark:text-gray-400 text-lg md:text-xl prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: adventure.tripSummary }}
                />
              )}
              {!adventure.tripSummary && adventure.subtitle && (
                <h2 className="text-[#638863] dark:text-gray-400 text-lg md:text-xl">
                  {adventure.subtitle}
                </h2>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">explore</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Image */}
      {adventure.mainImage && (
        <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden">
          <Image
            src={getStrapiMediaUrl(adventure.mainImage.url)}
            alt={adventure.mainImage.alternativeText || adventure.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Tab Navigation - Sticky at its position */}
      <div className="sticky top-[125px] md:top-[112px] z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-md">
        <div className="px-4 md:px-10 lg:px-40">
          <div className="max-w-[1200px] mx-auto">
            <ul className="flex gap-6 overflow-x-auto scrollbar-hide">
              <li>
                <button
                  onClick={() => scrollToSection('overview')}
                  className={`py-4 px-2 text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeSection === 'overview'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-[#638863] dark:text-gray-400 hover:text-[#111811] dark:hover:text-white'
                  }`}
                >
                  Genel Bakış
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('itinerary')}
                  className={`py-4 px-2 text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeSection === 'itinerary'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-[#638863] dark:text-gray-400 hover:text-[#111811] dark:hover:text-white'
                  }`}
                >
                  Detaylı Tur
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('requirements')}
                  className={`py-4 px-2 text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeSection === 'requirements'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-[#638863] dark:text-gray-400 hover:text-[#111811] dark:hover:text-white'
                  }`}
                >
                  Gereksinimler Kitabı
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className={`py-4 px-2 text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeSection === 'pricing'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-[#638863] dark:text-gray-400 hover:text-[#111811] dark:hover:text-white'
                  }`}
                >
                  Maliyet
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sections Content */}
      <div className="bg-white dark:bg-background-dark px-4 md:px-10 lg:px-40 py-8">
        <div className="max-w-[1200px] mx-auto space-y-16">
          {/* Overview Section */}
          <section id="overview" className="scroll-mt-48">
            <OverviewTab adventure={adventure} />
          </section>

          {/* Itinerary Section */}
          <section id="itinerary" className="scroll-mt-48">
            <ItineraryTab adventure={adventure} />
          </section>

          {/* Requirements Section */}
          <section id="requirements" className="scroll-mt-48">
            <RequirementsSection requirements={adventure.requirements} />
          </section>

          {/* Pricing Section */}
          {adventure.contentSections && adventure.contentSections.length > 0 && (
            <section id="pricing" className="scroll-mt-48">
              <ContentRenderer sections={adventure.contentSections.filter(
                section => section.__component === 'adventure.pricing-section'
              )} />
            </section>
          )}
        </div>
      </div>
    </>
  );
}
