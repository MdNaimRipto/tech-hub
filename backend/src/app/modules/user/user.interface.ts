export type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  password: string;
  street: string;
  city: string;
  district: string;
  userProfile: string;
  userRole: string;
  uid: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};
