/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
export interface IUser {
  name: string;
  email: string;
  contactNumber: string;
  password: string;
  street: string;
  city: string;
  district: string;
  userProfile: string;
  userRole: string;
  uid: string;
}

export interface IAuthenticatedUser extends Omit<IUser, "password"> {}

export type ILoginUser = {
  email: string;
  password: string;
};

export type IForgotPasswordValidator = {
  email: string;
};

export type IUpdatePassword = {
  email: string;
  password: string;
};

export type IUserFilters = {
  searchTerm?: string;
  name?: string;
  email?: string;
};
