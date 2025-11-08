import type { ContentSection } from '@/types/adventure';
import dynamic from 'next/dynamic';

// Dynamically import section components to reduce initial bundle size
const HeroSection = dynamic(() => import('./HeroSection'));
const InfoCardsSection = dynamic(() => import('./InfoCardsSection'));
const TimelineSection = dynamic(() => import('./TimelineSection'));
const GallerySection = dynamic(() => import('./GallerySection'));
const PricingSection = dynamic(() => import('./PricingSection'));
const ContactFormSection = dynamic(() => import('./ContactFormSection'));

interface ContentRendererProps {
  sections?: ContentSection[];
  section?: ContentSection;
}

export default function ContentRenderer({ sections, section }: ContentRendererProps) {
  // Support both single section and array of sections
  const sectionsArray = section ? [section] : sections;

  if (!sectionsArray || sectionsArray.length === 0) {
    return null;
  }

  return (
    <>
      {sectionsArray.map((item) => {
        switch (item.__component) {
          case 'adventure.hero-section':
            return <HeroSection key={item.id} data={item} />;
          case 'adventure.info-cards-section':
            return <InfoCardsSection key={item.id} data={item} />;
          case 'adventure.timeline-section':
            return <TimelineSection key={item.id} data={item} />;
          case 'adventure.gallery-section':
            return <GallerySection key={item.id} data={item} />;
          case 'adventure.pricing-section':
            return <PricingSection key={item.id} data={item} />;
          case 'adventure.contact-form-section':
            return <ContactFormSection key={item.id} data={item} />;
          default:
            console.warn(`Unknown component type: ${(item as { __component?: string }).__component}`);
            return null;
        }
      })}
    </>
  );
}
