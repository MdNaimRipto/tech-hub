export interface IRatingAndReviews {
  _id: string;
  userId: {
    _id: string;
    name: string;
    userProfile: string;
    id: string;
  };
  productId: string;
  review: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  id: string;
}
