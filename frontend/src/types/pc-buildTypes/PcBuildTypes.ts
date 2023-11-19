export interface IPcBuild {
  _id: string;
  buildName: string;
  code: string;
  savedTime: string;
  userID: {
    name: string;
    id: null;
  };
}

export interface IPcBuildCard {
  _id: string;
  images: {
    i1: string;
  };
  category: string;
  name: string;
  price: string;
  discountedPrice: number;
}
