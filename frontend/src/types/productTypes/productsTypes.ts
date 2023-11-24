// * All Filter Options Type
export type IAllProductsFilter = {
  page?: string;
  limit?: string;
  searchTerm: string;
};

export type IProductsByCategoryFilter = {
  category?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  limit?: string;
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
  category: string;
};

// * AllProductsType
export type IAllProducts = {
  _id: string;
  id: string;
  name: string;
  images: {
    i1: string;
  };
  price: string;
  discountedPrice: number;
  status: boolean;
  category: string;
};

// * Product Type
export type IProductDetails = {
  _id: string;
  name: string;
  status: boolean;
  rating: number;
  price: string;
  discount: number;
  discountedPrice: number;
  images: {
    i1: string;
    i2?: string;
    i3?: string;
    i4?: string;
  };
  features: {
    f1: string;
    f2: string;
    f3: string;
    f4: string;
    f5: string;
  };
  description: string;
  brand: string;
  category: string;
  code: string;
};
