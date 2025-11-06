// Strapi base types
export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

// Component types
export interface InfoCard {
  id: number;
  icon: string;
  label: string;
  value: string;
}

export interface TimelineItem {
  id: number;
  icon: string;
  day: string;
  description: string;
}

export interface GalleryImage {
  id: number;
  image: StrapiMedia;
  alt: string;
}

export interface PricingItem {
  id: number;
  text: string;
  isIncluded: boolean;
}

// New component types for G Adventures style
export interface TripAttributes {
  id: number;
  style: string;
  styleDescription: string;
  service: string;
  serviceDescription: string;
  physical: string;
  physicalDescription: string;
  groupType: string;
  groupTypeDescription: string;
}

export interface TripInfo {
  id: number;
  ageRequirement: string;
  visaRequirement: string;
  visaLink?: string;
}

export interface Requirements {
  id: number;
  physicalRequirements?: string;
  equipment?: string;
  healthRequirements?: string;
  experienceLevel?: string;
  importantNotes?: string;
}

export interface ItineraryActivity {
  id: number;
  name: string;
  description?: string;
  isOptional: boolean;
  icon: string;
}

export interface ItineraryDay {
  id: number;
  dayNumber: number;
  dayRange?: string;
  location: string;
  summary: string;
  details?: string;
  activities?: ItineraryActivity[];
  meals?: string;
  accommodation?: string;
  accommodationDetails?: string;
}

// Section types (Dynamic Zone components)
export interface HeroSection {
  id: number;
  __component: 'adventure.hero-section';
  title: string;
  subtitle: string;
  backgroundImage: StrapiMedia;
  heroVideo?: StrapiMedia;
  buttonText: string;
}

export interface InfoCardsSection {
  id: number;
  __component: 'adventure.info-cards-section';
  cards: InfoCard[];
}

export interface TimelineSection {
  id: number;
  __component: 'adventure.timeline-section';
  title: string;
  items: TimelineItem[];
}

export interface GallerySection {
  id: number;
  __component: 'adventure.gallery-section';
  title: string;
  images: GalleryImage[];
}

export interface PricingSection {
  id: number;
  __component: 'adventure.pricing-section';
  title: string;
  includedTitle: string;
  excludedTitle: string;
  includedItems: PricingItem[];
  excludedItems: PricingItem[];
  price: number;
  currency: string;
  priceLabel: string;
  buttonText: string;
}

export interface ContactFormSection {
  id: number;
  __component: 'adventure.contact-form-section';
  title: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  messageLabel: string;
  buttonText: string;
}

// Union type for all possible dynamic zone components
export type ContentSection =
  | HeroSection
  | InfoCardsSection
  | TimelineSection
  | GallerySection
  | PricingSection
  | ContactFormSection;

// Main Adventure type
export interface Adventure {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  duration?: number;
  startLocation?: string;
  endLocation?: string;
  mainImage?: StrapiMedia;
  images?: StrapiMedia[];
  tripAttributes?: TripAttributes;
  tripInfo?: TripInfo;
  requirements?: Requirements;
  itinerary?: ItineraryDay[];
  contentSections?: ContentSection[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

// Strapi API Response types
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: object;
}

// Adventure card type (simplified for listing)
export interface AdventureCard {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  subtitle?: string;
  heroImage?: StrapiMedia;
  price?: number;
  duration?: string;
  difficulty?: string;
}
