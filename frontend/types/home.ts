import { StrapiSingleResponse, StrapiMedia } from './tour';

export interface HeroSection {
  id: number;
  __component: 'home.hero-section';
  badgeText: string;
  badgeIcon: string;
  title: string;
  highlightedText: string;
  description: string;
  backgroundImage?: StrapiMedia;
  heroVideo?: StrapiMedia;
  overlayOpacity?: number;
  primaryButtonText: string;
  primaryButtonUrl: string;
  primaryButtonIcon: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  secondaryButtonIcon: string;
}

export interface StatItem {
  id: number;
  value: string;
  label: string;
  order: number;
}

export interface StatsSection {
  id: number;
  __component: 'home.stats-section';
  stats: StatItem[];
}

export interface FeaturedToursSection {
  id: number;
  __component: 'home.featured-tours-section';
  title: string;
  subtitle: string;
  numberOfTours: number;
  viewAllButtonText: string;
  viewAllButtonUrl: string;
}

export interface FeatureItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface FeaturesSection {
  id: number;
  __component: 'home.features-section';
  title: string;
  subtitle: string;
  features: FeatureItem[];
}

export interface CTASection {
  id: number;
  __component: 'home.cta-section';
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  buttonIcon: string;
}

export type HomeSection =
  | HeroSection
  | StatsSection
  | FeaturedToursSection
  | FeaturesSection
  | CTASection;

export interface Home {
  id: number;
  documentId: string;
  contentSections?: HomeSection[];
}

export type HomeResponse = StrapiSingleResponse<Home>;
