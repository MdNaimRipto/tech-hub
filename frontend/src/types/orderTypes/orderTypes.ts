export type IOrderProducts = {
  productID: string;
  quantity: number;
};

export type OrderedProducts = {
  productID: {
    _id: string;
    name: string;
    code: string;
    images: {
      i1: string;
    };
  };
  quantity: number;
};

type IUser = {
  email: string;
  name: string;
};

export type OrderProgress =
  | "Pending"
  | "Processing"
  | "Verifying"
  | "Confirmed"
  | "Delivered"
  | "Completed"
  | "Canceled";

export type IOrder = {
  _id: string;
  userID: IUser;
  products: OrderedProducts[];
  totalPrice: number;
  code: string;
  progress: OrderProgress;
  createdAt: string;
};

export interface IUserOrder {
  _id: string;
  totalPrice: number;
  code: string;
  progress: OrderProgress;
  createdAt: string;
}

export type IOrderDetails = {
  _id: string;
  userID: IUser;
  products: {
    productID: {
      _id: string;
      name: string;
      price: string;
      images: {
        i1: string;
      };
    };
    quantity: number;
  }[];
  totalPrice: number;
  code: string;
  progress: OrderProgress;
  createdAt: string;
};
