/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IProductsFilters, IProduct } from "./products.interface";
import { generateProductCode } from "./products.utils";
import { Products } from "./products.schema";
import { Users } from "../user/user.schema";
import {
  IGenericPaginationResponse,
  IPaginationOptions,
} from "../../../interface/pagination";
import { productsSearchableFields } from "./products.constant";
import { calculatePaginationFunction } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { Secret } from "jsonwebtoken";
import config from "../../../config/config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

//* Upload Product Api
const uploadProduct = async (
  payload: IProduct,
  token: string
): Promise<IProduct | null> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);
  // Saving Product Code
  const code = generateProductCode();
  const isExistsCode = await Products.findOne({ code: code });
  if (isExistsCode) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Product Already Exists! Try Again"
    );
  }
  payload.code = code;

  // Saving Discount Price
  const productPrice = parseFloat(payload.price);
  if (productPrice <= 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Price Must be More then 0.");
  }

  if (payload.discount === 0) {
    payload.discountedPrice = productPrice;
  } else if (payload.discount < 0 || payload.discount > 100) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Discount must be between 0 and 100."
    );
  } else {
    const discountAmount = (productPrice * payload.discount) / 100;
    const discountPrice = productPrice - discountAmount;
    payload.discountedPrice = Math.floor(discountPrice);
  }

  // Saving all Rating:
  payload.allRating = [0];

  payload.brand = payload.brand.toLocaleLowerCase();

  // Save Product
  const result = await Products.create(payload);
  return result;
};

//* Get All Products //! Filter
const getAllProducts = async (
  filters: IProductsFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<IProduct[]>> => {
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: productsSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  //
  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  //
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePaginationFunction(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  //
  const checkAndCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const products = await Products.find(checkAndCondition, {
    _id: 1,
    images: {
      i1: 1,
    },
    name: 1,
    price: 1,
    discountedPrice: 1,
  })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  if (products.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Products to Show");
  }

  const total = await Products.countDocuments(checkAndCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: products,
  };
};

//* Get Product By Category //! Filter
const getProductsByCategory = async (
  category: string,
  filters: IProductsFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<IProduct[]>> => {
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: productsSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  //
  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  //
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePaginationFunction(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  //
  const checkAndCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const query = {
    category: category,
    ...checkAndCondition,
  };

  const products = await Products.find(query, {
    _id: 1,
    images: {
      i1: 1,
    },
    name: 1,
    features: {
      f2: 1,
      f3: 1,
      f4: 1,
      f5: 1,
    },
    price: 1,
    discountedPrice: 1,
    status: 1,
  })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  if (products.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Products to Show");
  }

  const total = await Products.countDocuments(checkAndCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: products,
  };
};

//* Get Product By ID
const getProductsByID = async (productID: string): Promise<IProduct | null> => {
  const product = await Products.findById(
    { _id: productID },
    {
      discount: 0,
      quantity: 0,
      allRating: 0,
      code: 0,
      sellerID: 0,
    }
  );
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Product found");
  }

  return product;
};

//* Update Product
const updateProduct = async (
  productID: string,
  payload: Partial<IProduct>,
  token: string
): Promise<null> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const isExistsProduct = await Products.findById({ _id: productID });
  if (!isExistsProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Not Found!");
  }

  const {
    status,
    allRating,
    rating,
    code,
    sellerID,
    images,
    features,
    discount,
    price,
    ...restData
  } = payload;
  const updatedData: Partial<IProduct> = { ...restData };

  if (
    status ||
    allRating ||
    rating !== undefined ||
    code !== undefined ||
    sellerID !== undefined
  ) {
    throw new ApiError(
      httpStatus.PRECONDITION_FAILED,
      "Failed to Update! Please Try Again."
    );
  }

  if (images && Object.keys(images).length > 0) {
    Object.keys(images).map(key => {
      const imagesKey = `images.${key}`;
      (updatedData as any)[imagesKey] = images[key as keyof typeof images];
    });
  }

  if (features && Object.keys(features).length > 0) {
    Object.keys(features).map(key => {
      const featuresKey = `features.${key}`;
      (updatedData as any)[featuresKey] =
        features[key as keyof typeof features];
    });
  }

  // Saving Discount Price
  const productPrice = parseFloat(isExistsProduct.price);

  if (discount) {
    if (discount === 0) {
      updatedData.discountedPrice = productPrice;
    } else if (Number(discount) < 0 || Number(discount) > 100) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Discount must be between 0 and 100."
      );
    } else {
      const discountAmount = (productPrice * Number(discount)) / 100;
      const discountPrice = productPrice - discountAmount;
      updatedData.discountedPrice = Math.floor(discountPrice);
    }
  }

  if (price) {
    const convertedPrice = parseFloat(price);
    if (isExistsProduct.discount === 0) {
      updatedData.discountedPrice = convertedPrice;
    } else if (
      Number(isExistsProduct.discount) < 0 ||
      Number(isExistsProduct.discount) > 100
    ) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Discount must be between 0 and 100."
      );
    } else {
      console.log(isExistsProduct.discount);
      const discountAmount =
        (convertedPrice * Number(isExistsProduct.discount)) / 100;
      const discountPrice = convertedPrice - discountAmount;
      updatedData.price = price;
      updatedData.discountedPrice = Math.floor(discountPrice);
    }
  }

  await Products.findOneAndUpdate({ _id: productID }, updatedData, {
    new: true,
  });

  return null;
};

//* Update Rating Function:
const updateProductRating = async (
  id: string,
  useID: string,
  newRating: number,
  token: string
): Promise<null> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const isExists = await Products.findById({ _id: id });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Not Found!");
  }

  const checkUser = await Users.findById({ _id: useID });
  if (checkUser?.id === isExists.sellerID) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Permission Denied! Please Try Again."
    );
  }

  const { allRating } = isExists;

  if (allRating) {
    allRating.push(newRating);
    const totalRating = allRating.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const ratingCount = allRating.length - 1;
    const avgRating = totalRating / ratingCount;
    isExists.rating = avgRating >= 5 ? 5 : parseFloat(avgRating.toFixed(1));
  }
  await Products.findOneAndUpdate({ _id: id }, isExists, {
    new: true,
  });
  return null;
};

// * Product Service Export
export const ProductService = {
  uploadProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsByID,
  updateProduct,
  updateProductRating,
};
