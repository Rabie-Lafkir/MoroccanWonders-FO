export interface Itinerary {
  id: string;
  name: {
    en: string;
    fr: string;
  };
  createdBy: string;
  numberOfRatings: number;
  generalRating: number;
  travelPaths: TravelPath[];
  createdAt: string;
  updatedAt: string;
}

export interface TravelPath {
  id: string;
  visitDate: string;
  duration: string;
  order: number;
  place: Place;
}

export interface Place {
  id: string;
  name: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  location: {
    latitude: string;
    longitude: string;
  };
  city: string;
  region: string;
  images: string | null;
  numberOfRatings: number;
  generalRating: number;
  category: Category;
}

export interface Category {
  id: string;
  name: {
    en: string;
    fr: string;
  };
  subCategories: string[];
  createdBy: string;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryResponse {
  pageNo: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
  content: Itinerary[];
}
