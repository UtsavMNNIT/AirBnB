// Domain types for the listing. Kept framework-agnostic so both the
// server (API route handlers) and client components can share them.

export interface Photo {
  src: string;
  room: string;
  alt: string;
}

export interface PhotoGroup {
  title: string;
  subtitle: string;
  /** Indices into the flat `photos` array, in display order. */
  photoIndexes: number[];
}

export interface Amenity {
  label: string;
  icon: string;
  crossedOut?: boolean;
}

export interface Highlight {
  icon: string;
  title: string;
  body: string;
}

export interface SleepArea {
  title: string;
  detail: string;
  image: string;
}

export interface RatingCategory {
  label: string;
  score: number;
  icon: string;
}

export interface ReviewTag {
  icon: string;
  label: string;
  count: number;
}

export interface Review {
  name: string;
  avatar?: string;
  tenure: string;
  when: string;
  text: string;
  stars: number;
}

export interface CoHost {
  name: string;
  avatar?: string;
}

export interface NearbyStay {
  title: string;
  price: string;
  rating: number;
  image: string;
}

export interface ThingsToKnowColumn {
  title: string;
  lines: string[];
}

export interface Listing {
  title: string;
  subtitle: string;
  specs: string;
  rating: number;
  reviewCount: number;
  guestFavourite: boolean;
  hero: string[];
  photos: Photo[];
  photoGroups: PhotoGroup[];
  highlights: Highlight[];
  descriptionShort: string;
  descriptionFull: string;
  sleep: SleepArea[];
  amenitiesPreview: Amenity[];
  amenitiesTotal: number;
  ratingCategories: RatingCategory[];
  ratingDistribution: number[];
  reviewTags: ReviewTag[];
  reviews: Review[];
  host: {
    name: string;
    logoText: string[];
    reviews: number;
    rating: number;
    yearsHosting: number;
    facts: string[];
    responseRate: string;
    responseTime: string;
  };
  coHosts: CoHost[];
  booking: {
    price: string;
    period: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    freeCancellation: string;
    promo: { title: string; terms: string };
  };
  stayNights: { title: string; range: string };
  location: { heading: string; proviso: string; highlightsShort: string; highlightsFull: string };
  thingsToKnow: ThingsToKnowColumn[];
  nearby: NearbyStay[];
}
