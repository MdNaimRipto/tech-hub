export interface IWishlistProduct {
  _id: string;
  userID: string;
  productID: {
    _id: string;
    images: {
      i1: string;
    };
    name: string;
    status: boolean;
    price: string;
  };
  createdAt: string;
  updatedAt: string;
}
