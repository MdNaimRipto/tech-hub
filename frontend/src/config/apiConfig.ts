export const config = {
  SERVER_BASE_URL: "https://tech-mart-backend.vercel.app/api/v1.0",
  AUTH: {
    REGISTER: "/user/userRegister",
    LOGIN: "/user/userLogin",
  },
  USERS: {
    GET_AUTHENTICATED_DATA: "/user/getAuthenticatedUser",
    UPDATE_USER: "/user/updateUser",
  },
  PRODUCTS: {
    UPLOAD_PRODUCT: "/products/uploadProduct",
    GET_ALL_PRODUCT: "/products/getAllProducts",
    GET_PRODUCTS_COUNT: "/products/getProductsCount",
    GET_PRODUCTS_BY_CATEGORY: "/products/getProducts",
    GET_TOP_SELLING_PRODUCTS: "/products/getTopSellingProducts",
    GET_PRODUCTS_BY_ID: "/products/getProductByID",
    UPDATE_PRODUCT: "/products/updateProduct",
    UPDATE_RATING: "/products/updateRating",
  },
};
