import type { Schema, Struct } from '@strapi/strapi';

export interface AdventureContactFormSection extends Struct.ComponentSchema {
  collectionName: 'components_adventure_contact_form_sections';
  info: {
    description: 'Reservation and contact form section';
    displayName: 'Contact Form Section';
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'G\u00F6nder'>;
    emailLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'E-posta Adresi'>;
    messageLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Mesaj\u0131n\u0131z'>;
    nameLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Ad Soyad'>;
    phoneLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Telefon Numaras\u0131'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Rezervasyon Yap\u0131n veya Soru Sorun'>;
  };
}

export interface AdventureGalleryImage extends Struct.ComponentSchema {
  collectionName: 'components_adventure_gallery_images';
  info: {
    description: 'Single image for the adventure gallery';
    displayName: 'Gallery Image';
  };
  attributes: {
    alt: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface AdventureGallerySection extends Struct.ComponentSchema {
  collectionName: 'components_adventure_gallery_sections';
  info: {
    description: 'Photo gallery section';
    displayName: 'Gallery Section';
  };
  attributes: {
    images: Schema.Attribute.Component<'adventure.gallery-image', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Foto\u011Fraf Galerisi'>;
  };
}

export interface AdventureHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_adventure_hero_sections';
  info: {
    description: 'Main hero section with background image';
    displayName: 'Hero Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Rezervasyon Yap'>;
    heroVideo: Schema.Attribute.Media<'videos'>;
    subtitle: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AdventureInfoCard extends Struct.ComponentSchema {
  collectionName: 'components_adventure_info_cards';
  info: {
    description: 'Information card with icon, label and value';
    displayName: 'Info Card';
  };
  attributes: {
    icon: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'calendar_month'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AdventureInfoCardsSection extends Struct.ComponentSchema {
  collectionName: 'components_adventure_info_cards_sections';
  info: {
    description: 'Section displaying adventure information cards';
    displayName: 'Info Cards Section';
  };
  attributes: {
    cards: Schema.Attribute.Component<'adventure.info-card', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

export interface AdventureItineraryActivity extends Struct.ComponentSchema {
  collectionName: 'components_adventure_itinerary_activities';
  info: {
    description: 'Optional or included activity in the itinerary';
    displayName: 'Itinerary Activity';
  };
  attributes: {
    description: Schema.Attribute.Text;
    distance: Schema.Attribute.String;
    duration: Schema.Attribute.String;
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'place'>;
    isOptional: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.String;
  };
}

export interface AdventureItineraryDay extends Struct.ComponentSchema {
  collectionName: 'components_adventure_itinerary_days';
  info: {
    description: 'Daily itinerary with location, summary and details';
    displayName: 'Itinerary Day';
  };
  attributes: {
    accommodation: Schema.Attribute.String;
    accommodationDetails: Schema.Attribute.Text;
    activities: Schema.Attribute.Component<
      'adventure.itinerary-activity',
      true
    >;
    dayNumber: Schema.Attribute.Integer & Schema.Attribute.Required;
    dayRange: Schema.Attribute.String;
    details: Schema.Attribute.RichText;
    location: Schema.Attribute.String & Schema.Attribute.Required;
    meals: Schema.Attribute.String;
    summary: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface AdventurePricingItem extends Struct.ComponentSchema {
  collectionName: 'components_adventure_pricing_items';
  info: {
    description: 'List item for included/excluded features';
    displayName: 'Pricing Item';
  };
  attributes: {
    isIncluded: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AdventurePricingSection extends Struct.ComponentSchema {
  collectionName: 'components_adventure_pricing_sections';
  info: {
    description: 'Adventure pricing and included/excluded items';
    displayName: 'Pricing Section';
  };
  attributes: {
    excludedItems: Schema.Attribute.Component<'adventure.pricing-item', true>;
    excludedTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Fiyata Dahil Olmayanlar'>;
    includedItems: Schema.Attribute.Component<'adventure.pricing-item', true>;
    includedTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Fiyata Dahil Olanlar'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Fiyatland\u0131rma'>;
  };
}

export interface AdventureRequirements extends Struct.ComponentSchema {
  collectionName: 'components_adventure_requirements';
  info: {
    description: 'Tour participation requirements and prerequisites';
    displayName: 'Requirements';
  };
  attributes: {
    equipment: Schema.Attribute.RichText;
    experienceLevel: Schema.Attribute.RichText;
    healthRequirements: Schema.Attribute.RichText;
    importantNotes: Schema.Attribute.RichText;
    physicalRequirements: Schema.Attribute.RichText;
  };
}

export interface AdventureTimelineItem extends Struct.ComponentSchema {
  collectionName: 'components_adventure_timeline_items';
  info: {
    description: 'A single day in the adventure timeline';
    displayName: 'Timeline Item';
  };
  attributes: {
    day: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'hiking'>;
  };
}

export interface AdventureTimelineSection extends Struct.ComponentSchema {
  collectionName: 'components_adventure_timeline_sections';
  info: {
    description: 'Adventure program timeline';
    displayName: 'Timeline Section';
  };
  attributes: {
    items: Schema.Attribute.Component<'adventure.timeline-item', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Macera Program\u0131'>;
  };
}

export interface AdventureTripAttributes extends Struct.ComponentSchema {
  collectionName: 'components_adventure_trip_attributes';
  info: {
    description: 'Trip style, service level, physical rating and group type';
    displayName: 'Trip Attributes';
  };
  attributes: {
    groupType: Schema.Attribute.String & Schema.Attribute.Required;
    groupTypeDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    physical: Schema.Attribute.String & Schema.Attribute.Required;
    physicalDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    service: Schema.Attribute.String & Schema.Attribute.Required;
    serviceDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    style: Schema.Attribute.Text & Schema.Attribute.Required;
    styleDescription: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface AdventureTripInfo extends Struct.ComponentSchema {
  collectionName: 'components_adventure_trip_info';
  info: {
    description: 'Age requirements and visa information';
    displayName: 'Trip Info';
  };
  attributes: {
    ageRequirement: Schema.Attribute.Text & Schema.Attribute.Required;
    visaLink: Schema.Attribute.String;
    visaRequirement: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface GlobalBookingButtonSettings extends Struct.ComponentSchema {
  collectionName: 'components_global_booking_button_settings';
  info: {
    description: 'Floating booking button configuration';
    displayName: 'Booking Button Settings';
  };
  attributes: {
    buttonIcon: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'calendar_month'>;
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Rezervasyon Yap'>;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    position: Schema.Attribute.Enumeration<['bottom-right', 'bottom-left']> &
      Schema.Attribute.DefaultTo<'bottom-right'>;
    showOnMobile: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface HomeCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_home_cta_sections';
  info: {
    description: 'Call-to-action section with icon, title, description, and button';
    displayName: 'CTA Section';
  };
  attributes: {
    buttonIcon: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'arrow_forward'>;
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Hemen Ke\u015Ffet'>;
    buttonUrl: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/tours'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'explore'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_home_feature_items';
  info: {
    description: 'A single feature with icon, title, and description';
    displayName: 'Feature Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeFeaturedToursSection extends Struct.ComponentSchema {
  collectionName: 'components_home_featured_tours_sections';
  info: {
    description: 'Featured tours section with title, subtitle, and tour count';
    displayName: 'Featured Tours Section';
  };
  attributes: {
    numberOfTours: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 12;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    subtitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'En pop\u00FCler do\u011Fa rotalar\u0131m\u0131z\u0131 ke\u015Ffedin'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'\u00D6ne \u00C7\u0131kan Turlar'>;
    viewAllButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'T\u00FCm Turlar\u0131 G\u00F6r'>;
    viewAllButtonUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/tours'>;
  };
}

export interface HomeFeaturesSection extends Struct.ComponentSchema {
  collectionName: 'components_home_features_sections';
  info: {
    description: 'Features section with title, subtitle, and feature items';
    displayName: 'Features Section';
  };
  attributes: {
    features: Schema.Attribute.Component<'home.feature-item', true>;
    subtitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Do\u011Fa turlar\u0131nda g\u00FCvenilir tercihiniz'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Neden Inviktours?'>;
  };
}

export interface HomeHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_sections';
  info: {
    description: 'Homepage hero section with title, subtitle, and CTAs';
    displayName: 'Hero Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    badgeIcon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'eco'>;
    badgeText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Do\u011Fa ile B\u00FCt\u00FCnle\u015Fin'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    heroVideo: Schema.Attribute.Media<'videos'>;
    highlightedText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Yolculuklar'>;
    overlayOpacity: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<50>;
    primaryButtonIcon: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'arrow_forward'>;
    primaryButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Turlar\u0131 Ke\u015Ffet'>;
    primaryButtonUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/tours'>;
    secondaryButtonIcon: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'expand_more'>;
    secondaryButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Daha Fazla Bilgi'>;
    secondaryButtonUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#features'>;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface HomeStatItem extends Struct.ComponentSchema {
  collectionName: 'components_home_stat_items';
  info: {
    description: 'A single stat item with value and label';
    displayName: 'Stat Item';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeStatsSection extends Struct.ComponentSchema {
  collectionName: 'components_home_stats_sections';
  info: {
    description: 'Statistics section with multiple stat items';
    displayName: 'Stats Section';
  };
  attributes: {
    stats: Schema.Attribute.Component<'home.stat-item', true>;
  };
}

export interface LayoutNavigationLink extends Struct.ComponentSchema {
  collectionName: 'components_layout_navigation_links';
  info: {
    description: 'A single navigation menu item';
    displayName: 'Navigation Link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TourContactFormSection extends Struct.ComponentSchema {
  collectionName: 'components_tour_contact_form_sections';
  info: {
    description: 'Reservation and contact form section';
    displayName: 'Contact Form Section';
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'G\u00F6nder'>;
    emailLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'E-posta Adresi'>;
    messageLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Mesaj\u0131n\u0131z'>;
    nameLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Ad Soyad'>;
    phoneLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Telefon Numaras\u0131'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Rezervasyon Yap\u0131n veya Soru Sorun'>;
  };
}

export interface TourGalleryImage extends Struct.ComponentSchema {
  collectionName: 'components_tour_gallery_images';
  info: {
    description: 'Single image for the tour gallery';
    displayName: 'Gallery Image';
  };
  attributes: {
    alt: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface TourGallerySection extends Struct.ComponentSchema {
  collectionName: 'components_tour_gallery_sections';
  info: {
    description: 'Photo gallery section';
    displayName: 'Gallery Section';
  };
  attributes: {
    images: Schema.Attribute.Component<'tour.gallery-image', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Foto\u011Fraf Galerisi'>;
  };
}

export interface TourHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_tour_hero_sections';
  info: {
    description: 'Main hero section with background image';
    displayName: 'Hero Section';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Rezervasyon Yap'>;
    heroVideo: Schema.Attribute.Media<'videos'>;
    subtitle: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TourInfoCard extends Struct.ComponentSchema {
  collectionName: 'components_tour_info_cards';
  info: {
    description: 'Information card with icon, label and value';
    displayName: 'Info Card';
  };
  attributes: {
    icon: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'calendar_month'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TourInfoCardsSection extends Struct.ComponentSchema {
  collectionName: 'components_tour_info_cards_sections';
  info: {
    description: 'Section displaying tour information cards';
    displayName: 'Info Cards Section';
  };
  attributes: {
    cards: Schema.Attribute.Component<'tour.info-card', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

export interface TourPricingItem extends Struct.ComponentSchema {
  collectionName: 'components_tour_pricing_items';
  info: {
    description: 'List item for included/excluded features';
    displayName: 'Pricing Item';
  };
  attributes: {
    isIncluded: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TourPricingSection extends Struct.ComponentSchema {
  collectionName: 'components_tour_pricing_sections';
  info: {
    description: 'Tour pricing and included/excluded items';
    displayName: 'Pricing Section';
  };
  attributes: {
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Rezervasyon Yap'>;
    currency: Schema.Attribute.String & Schema.Attribute.DefaultTo<'TL'>;
    excludedItems: Schema.Attribute.Component<'tour.pricing-item', true>;
    excludedTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Fiyata Dahil Olmayanlar'>;
    includedItems: Schema.Attribute.Component<'tour.pricing-item', true>;
    includedTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Fiyata Dahil Olanlar'>;
    price: Schema.Attribute.Decimal & Schema.Attribute.Required;
    priceLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Ki\u015Fi Ba\u015F\u0131'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Fiyatland\u0131rma'>;
  };
}

export interface TourTimelineItem extends Struct.ComponentSchema {
  collectionName: 'components_tour_timeline_items';
  info: {
    description: 'A single day in the tour timeline';
    displayName: 'Timeline Item';
  };
  attributes: {
    day: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'hiking'>;
  };
}

export interface TourTimelineSection extends Struct.ComponentSchema {
  collectionName: 'components_tour_timeline_sections';
  info: {
    description: 'Tour program timeline';
    displayName: 'Timeline Section';
  };
  attributes: {
    items: Schema.Attribute.Component<'tour.timeline-item', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Tur Program\u0131'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'adventure.contact-form-section': AdventureContactFormSection;
      'adventure.gallery-image': AdventureGalleryImage;
      'adventure.gallery-section': AdventureGallerySection;
      'adventure.hero-section': AdventureHeroSection;
      'adventure.info-card': AdventureInfoCard;
      'adventure.info-cards-section': AdventureInfoCardsSection;
      'adventure.itinerary-activity': AdventureItineraryActivity;
      'adventure.itinerary-day': AdventureItineraryDay;
      'adventure.pricing-item': AdventurePricingItem;
      'adventure.pricing-section': AdventurePricingSection;
      'adventure.requirements': AdventureRequirements;
      'adventure.timeline-item': AdventureTimelineItem;
      'adventure.timeline-section': AdventureTimelineSection;
      'adventure.trip-attributes': AdventureTripAttributes;
      'adventure.trip-info': AdventureTripInfo;
      'global.booking-button-settings': GlobalBookingButtonSettings;
      'home.cta-section': HomeCtaSection;
      'home.feature-item': HomeFeatureItem;
      'home.featured-tours-section': HomeFeaturedToursSection;
      'home.features-section': HomeFeaturesSection;
      'home.hero-section': HomeHeroSection;
      'home.stat-item': HomeStatItem;
      'home.stats-section': HomeStatsSection;
      'layout.navigation-link': LayoutNavigationLink;
      'tour.contact-form-section': TourContactFormSection;
      'tour.gallery-image': TourGalleryImage;
      'tour.gallery-section': TourGallerySection;
      'tour.hero-section': TourHeroSection;
      'tour.info-card': TourInfoCard;
      'tour.info-cards-section': TourInfoCardsSection;
      'tour.pricing-item': TourPricingItem;
      'tour.pricing-section': TourPricingSection;
      'tour.timeline-item': TourTimelineItem;
      'tour.timeline-section': TourTimelineSection;
    }
  }
}
