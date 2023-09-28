import config from "../../../config/config";
import CryptoJS from "crypto-js";
import { IAuthenticatedUser } from "./user.interface";

export function generateUID() {
  const uidLength = 20;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uid = "B#00";

  for (let i = 0; i < uidLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uid += characters.charAt(randomIndex);
  }

  return uid;
}

export function encryptData(data: IAuthenticatedUser) {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    String(config.secret)
  ).toString();
  return encryptedData;
}
