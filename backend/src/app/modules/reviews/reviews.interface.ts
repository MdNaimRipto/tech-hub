export type IReviews = {
  userId: string;
  userName: string;
  productId: string;
  review: string;
};

export type IUpdateReview = {
  userId: string;
  newReview: string;
};
