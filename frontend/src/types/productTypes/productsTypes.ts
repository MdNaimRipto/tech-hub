// * All Filter Options Type
export type IProductsByCategoryFilter = {
  category?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: string;
  limit?: string;
  minPrice?: string;
  maxPrice?: string;
  status?: string;
  brand?: string;
};

// * Product Type
export type IProducts = {
  _id: string;
  name: string;
  status: boolean;
  price: string;
  discountedPrice: number;
  images: {
    i1: string;
  };
  features: {
    f2: string;
    f3: string;
    f4: string;
    f5: string;
  };
  brand: string;
};
