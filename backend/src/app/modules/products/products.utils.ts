import { Reviews } from "../reviews/reviews.schema";

export function generateProductCode() {
  const codeLength = 6;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "P#";

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

export async function getProductRating(productID: string) {
  const ratings = await Reviews.find(
    { productId: productID },
    { _id: 0, rating: 1 }
  );

  // Extract the ratings from the objects
  const ratingValues = ratings.map(ratingObj => ratingObj.rating);
  const totalRating = ratingValues.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const ratingCount = ratingValues.length;
  const avgRating = totalRating / ratingCount;
  const newRating = parseFloat(avgRating.toFixed(1));
  return newRating;
}
