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
    updatedAt: string | null;
  }