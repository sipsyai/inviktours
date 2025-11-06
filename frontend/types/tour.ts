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

// Section types (Dynamic Zone components)
export interface HeroSection {
  id: number;
  __component: 'tour.hero-section';
  title: string;
  subtitle: string;
  backgroundImage: StrapiMedia;
  heroVideo?: StrapiMedia;
  buttonText: string;
}

export interface InfoCardsSection {
  id: number;
  __component: 'tour.info-cards-section';
  cards: InfoCard[];
}

export interface TimelineSection {
  id: number;
  __component: 'tour.timeline-section';
  title: string;
  items: TimelineItem[];
}

export interface GallerySection {
  id: number;
  __component: 'tour.gallery-section';
  title: string;
  images: GalleryImage[];
}

export interface PricingSection {
  id: number;
  __component: 'tour.pricing-section';
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
  __component: 'tour.contact-form-section';
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

// Adventure type for Tour relation
export interface TourAdventure {
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
  tripAttributes?: {
    id: number;
    style: string;
    styleDescription: string;
    service: string;
    serviceDescription: string;
    physical: string;
    physicalDescription: string;
    groupType: string;
    groupTypeDescription: string;
  };
  tripInfo?: {
    id: number;
    ageRequirement: string;
    visaRequirement: string;
    visaLink?: string;
  };
  itinerary?: Array<{
    id: number;
    dayNumber: number;
    dayRange?: string;
    location: string;
    summary: string;
    details?: string;
    activities?: Array<{
      id: number;
      name: string;
      description?: string;
      isOptional: boolean;
      icon: string;
    }>;
    meals?: string;
    accommodation?: string;
    accommodationDetails?: string;
  }>;
  video?: StrapiMedia;
  contentSections?: Array<{
    id: number;
    __component: string;
    [key: string]: any;
  }>;
}

// Main Tour type
export interface Tour {
  id: number;
  documentId: string;
  slug: string;
  adventure?: TourAdventure;
  startDate?: string;
  endDate?: string;
  price?: number;
  currency?: string;
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

// Navigation Link type
export interface NavigationLink {
  id: number;
  label: string;
  url: string;
  isExternal: boolean;
  order: number;
}

// Booking Button Settings type
export interface BookingButtonSettings {
  id: number;
  enabled: boolean;
  buttonText: string;
  buttonIcon: string;
  position: 'bottom-right' | 'bottom-left';
  showOnMobile: boolean;
}

// Global settings type
export interface Global {
  id: number;
  documentId: string;
  siteName: string;
  siteDescription: string;
  logo?: StrapiMedia;
  navigationLinks: NavigationLink[];
  contactButtonText: string;
  contactButtonUrl: string;
  footerText: string;
  bookingButtonSettings?: BookingButtonSettings;
}

// Tour card type (simplified for listing)
export interface TourCard {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  subtitle?: string;
  heroImage?: StrapiMedia;
  price?: number;
  startDate?: string;
  endDate?: string;
  currency?: string;
}
