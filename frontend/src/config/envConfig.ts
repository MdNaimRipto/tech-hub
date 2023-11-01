/* eslint-disable import/no-anonymous-default-export */
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

export default {
  secret_key: process.env.NEXT_PUBLIC_SECRET_KEY,
};
