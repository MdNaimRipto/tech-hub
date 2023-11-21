export interface ICartProducts {
  product: {
    _id: string;
    name: string;
    status: boolean;
    images: {
      i1: string;
    };
    discountedPrice: number;
  };
  quantity: number;
}

export interface IRootCartState {
  list: ICartProducts[];
  total: number;
}

export interface ICartState {
  list: ICartProducts[] | [];
  total: number;
}
