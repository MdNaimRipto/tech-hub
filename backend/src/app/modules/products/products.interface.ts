type Images = {
  i1: string;
  i2: string;
  i3: string;
  i4: string;
};

type Features = {
  f1: string;
  f2: string;
  f3: string;
  f4: string;
  f5: string;
};

export type IProduct = {
  name: string;
  images: Images;
  features: Features;
  category: string;
  price: string;
  discount: number;
  discountedPrice: number;
  quantity: number;
  totalSale: number;
  status: boolean;
  description: string;
  allRating: number[];
  rating: number;
  brand: string;
  code: string;
  sellerID: string;
};

export type IProductsFilters = {
  searchTerm?: string;
  name?: string;
  category?: string;
  price?: string;
  brand?: string;
};
