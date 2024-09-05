export interface Destination {
    id: string;
    name: {
      en: string;
      fr: string;
    };
    description: {
      en: string;
      fr: string;
    };
    region: string;
    images: string[];
    numberOfRatings: number;
    generalRating: number;
    category: {
      id: string;
      name: {
        en: string;
        fr: string;
      };
      subCategories: string[];
      createdBy: string;
      updatedBy: string | null;
      createdAt: string;
      updatedAt: string | null;
    };
    createdAt: string;
  }
  
  export interface DestinationResponse {
    pageNo: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
    content: Destination[];
  }
  