export interface IUser {
  _id: string;
  name: string;
  email: string;
  contactNumber: string;
  street: string;
  city: string;
  district: string;
  userProfile: string;
  userRole: string;
  uid: string;
}

export interface IAllUser {
  name: string;
  email: string;
  contactNumber: string;
  userProfile: string;
}
