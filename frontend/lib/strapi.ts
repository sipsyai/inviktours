import qs from 'qs';
import type { Tour, StrapiResponse, StrapiSingleResponse, Global, TourCard, StrapiMedia } from '@/types/tour';
import type { Adventure, AdventureCard } from '@/types/adventure';
import type { Home, HomeResponse } from '@/types/home';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * Fetch data from Strapi API
 * Returns null on error to handle build-time gracefully
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
  params: object = {}
): Promise<T | null> {
  try {
    const queryString = qs.stringify(params, {
      encodeValuesOnly: true,
    });

    const url = `${STRAPI_URL}/api${endpoint}${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch from Strapi: ${res.status} ${res.statusText}`);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching from Strapi (${endpoint}):`, error);
    return null;
  }
}

/**
 * Get all tours
 */
export async function getAllTours(): Promise<Tour[]> {
  const data = await fetchAPI<StrapiResponse<Tour[]>>(
    '/tours',
    { next: { revalidate: 60 } },
    {
      populate: {
        contentSections: {
          on: {
            'tour.hero-section': {
              populate: ['backgroundImage', 'heroVideo'],
            },
            'tour.info-cards-section': {
              populate: ['cards'],
            },
            'tour.timeline-section': {
              populate: ['items'],
            },
            'tour.gallery-section': {
              populate: {
                images: {
                  populate: ['image'],
                },
              },
            },
            'tour.pricing-section': {
              populate: ['includedItems', 'excludedItems'],
            },
            'tour.contact-form-section': {
              populate: '*',
            },
          },
        },
      },
    }
  );

  return data?.data || [];
}

/**
 * Get a single tour by slug
 */
export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const data = await fetchAPI<StrapiResponse<Tour[]>>(
    '/tours',
    { next: { revalidate: 60 } },
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        adventure: {
          populate: {
            mainImage: true,
            images: true,
            video: true,
            tripAttributes: true,
            tripInfo: true,
            requirements: true,
            itinerary: {
              populate: {
                activities: true,
              },
            },
            contentSections: {
              on: {
                'adventure.hero-section': {
                  populate: ['backgroundImage', 'heroVideo'],
                },
                'adventure.info-cards-section': {
                  populate: ['cards'],
                },
                'adventure.timeline-section': {
                  populate: ['items'],
                },
                'adventure.gallery-section': {
                  populate: {
                    images: {
                      populate: ['image'],
                    },
                  },
                },
                'adventure.pricing-section': {
                  populate: ['includedItems', 'excludedItems'],
                },
                'adventure.contact-form-section': {
                  populate: '*',
                },
              },
            },
            tours: {
              fields: ['slug', 'startDate', 'endDate', 'price', 'currency'],
            },
          },
        },
        contentSections: {
          on: {
            'tour.hero-section': {
              populate: ['backgroundImage', 'heroVideo'],
            },
            'tour.info-cards-section': {
              populate: ['cards'],
            },
            'tour.timeline-section': {
              populate: ['items'],
            },
            'tour.gallery-section': {
              populate: {
                images: {
                  populate: ['image'],
                },
              },
            },
            'tour.pricing-section': {
              populate: ['includedItems', 'excludedItems'],
            },
            'tour.contact-form-section': {
              populate: '*',
            },
          },
        },
      },
    }
  );

  return data?.data?.[0] || null;
}

/**
 * Get all tour slugs for static generation
 */
export async function getAllTourSlugs(): Promise<string[]> {
  const data = await fetchAPI<StrapiResponse<Tour[]>>(
    '/tours',
    { next: { revalidate: 60 } },
    {
      fields: ['slug'],
    }
  );

  return data?.data?.map((tour) => tour.slug) || [];
}

/**
 * Get Strapi media URL
 */
export function getStrapiMediaUrl(url: string): string {
  if (url.startsWith('http')) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
}

/**
 * Get global settings (navigation, site info, etc.)
 */
export async function getGlobalSettings(): Promise<Global | null> {
  const data = await fetchAPI<StrapiSingleResponse<Global>>(
    '/global',
    { next: { revalidate: 3600 } }, // Cache for 1 hour
    {
      populate: {
        logo: true,
        navigationLinks: true,
        bookingButtonSettings: true,
      },
    }
  );

  return data?.data || null;
}

/**
 * Get tours for listing page (lighter payload)
 */
export async function getToursForListing(): Promise<TourCard[]> {
  const data = await fetchAPI<StrapiResponse<Tour[]>>(
    '/tours',
    { next: { revalidate: 60 } },
    {
      populate: {
        adventure: {
          fields: ['title', 'subtitle'],
          populate: {
            contentSections: {
              on: {
                'adventure.hero-section': {
                  populate: ['backgroundImage'],
                },
              },
            },
          },
        },
      },
    }
  );

  if (!data?.data) {
    return [];
  }

  // Transform tours to card format
  return data.data.map((tour) => {
    // Get adventure hero image
    const adventureHeroSection = tour.adventure?.contentSections?.find(
      (section) => section.__component === 'adventure.hero-section'
    ) as { backgroundImage?: StrapiMedia } | undefined;

    return {
      id: tour.id,
      documentId: tour.documentId,
      title: tour.adventure?.title || 'Tur',
      slug: tour.slug,
      subtitle: tour.adventure?.subtitle,
      heroImage: adventureHeroSection?.backgroundImage,
      price: tour.price,
      startDate: tour.startDate,
      endDate: tour.endDate,
      currency: tour.currency,
    };
  });
}

/**
 * Get home page content
 */
export async function getHomeContent(): Promise<Home | null> {
  const data = await fetchAPI<HomeResponse>(
    '/home',
    { next: { revalidate: 60 } },
    {
      populate: {
        contentSections: {
          on: {
            'home.hero-section': {
              populate: ['backgroundImage', 'heroVideo'],
            },
            'home.stats-section': {
              populate: ['stats'],
            },
            'home.featured-tours-section': {
              populate: '*',
            },
            'home.features-section': {
              populate: ['features'],
            },
            'home.cta-section': {
              populate: '*',
            },
          },
        },
      },
    }
  );

  return data?.data || null;
}

/**
 * Get all adventures
 */
export async function getAllAdventures(): Promise<Adventure[]> {
  const data = await fetchAPI<StrapiResponse<Adventure[]>>(
    '/adventures',
    { next: { revalidate: 60 } },
    {
      populate: {
        contentSections: {
          on: {
            'adventure.hero-section': {
              populate: ['backgroundImage', 'heroVideo'],
            },
            'adventure.info-cards-section': {
              populate: ['cards'],
            },
            'adventure.timeline-section': {
              populate: ['items'],
            },
            'adventure.gallery-section': {
              populate: {
                images: {
                  populate: ['image'],
                },
              },
            },
            'adventure.pricing-section': {
              populate: ['includedItems', 'excludedItems'],
            },
            'adventure.contact-form-section': {
              populate: '*',
            },
          },
        },
      },
    }
  );

  return data?.data || [];
}

/**
 * Get a single adventure by slug
 */
export async function getAdventureBySlug(slug: string): Promise<Adventure | null> {
  const data = await fetchAPI<StrapiResponse<Adventure[]>>(
    '/adventures',
    { next: { revalidate: 60 } },
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        mainImage: true,
        images: true,
        tripAttributes: true,
        tripInfo: true,
        requirements: true,
        itinerary: {
          populate: {
            activities: true,
          },
        },
        tours: {
          fields: ['slug', 'startDate', 'endDate', 'price', 'currency'],
        },
        contentSections: {
          on: {
            'adventure.hero-section': {
              populate: ['backgroundImage', 'heroVideo'],
            },
            'adventure.info-cards-section': {
              populate: ['cards'],
            },
            'adventure.timeline-section': {
              populate: ['items'],
            },
            'adventure.gallery-section': {
              populate: {
                images: {
                  populate: ['image'],
                },
              },
            },
            'adventure.pricing-section': {
              populate: ['includedItems', 'excludedItems'],
            },
            'adventure.contact-form-section': {
              populate: '*',
            },
          },
        },
      },
    }
  );

  return data?.data?.[0] || null;
}

/**
 * Get all adventure slugs for static generation
 */
export async function getAllAdventureSlugs(): Promise<string[]> {
  const data = await fetchAPI<StrapiResponse<Adventure[]>>(
    '/adventures',
    { next: { revalidate: 60 } },
    {
      fields: ['slug'],
    }
  );

  return data?.data?.map((adventure) => adventure.slug) || [];
}

/**
 * Get adventures for listing page (lighter payload)
 */
export async function getAdventuresForListing(): Promise<AdventureCard[]> {
  const data = await fetchAPI<StrapiResponse<Adventure[]>>(
    '/adventures',
    { next: { revalidate: 60 } },
    {
      populate: {
        contentSections: {
          populate: '*',
        },
      },
    }
  );

  if (!data?.data) {
    return [];
  }

  // Transform adventures to card format
  return data.data.map((adventure) => {
    const heroSection = adventure.contentSections?.find(
      (section) => section.__component === 'adventure.hero-section'
    ) as unknown as { backgroundImage?: StrapiMedia };

    const infoCardsSection = adventure.contentSections?.find(
      (section) => section.__component === 'adventure.info-cards-section'
    ) as unknown as { cards?: Array<{ label: string; value: string }> };

    const pricingSection = adventure.contentSections?.find(
      (section) => section.__component === 'adventure.pricing-section'
    ) as unknown as { price?: number };

    // Extract duration and difficulty from info cards
    const durationCard = infoCardsSection?.cards?.find(
      (card) => card.label === 'Süre'
    );
    const difficultyCard = infoCardsSection?.cards?.find(
      (card) => card.label === 'Zorluk'
    );

    return {
      id: adventure.id,
      documentId: adventure.documentId,
      title: adventure.title,
      slug: adventure.slug,
      subtitle: adventure.subtitle,
      heroImage: heroSection?.backgroundImage,
      price: pricingSection?.price,
      duration: durationCard?.value,
      difficulty: difficultyCard?.value,
    };
  });
}
