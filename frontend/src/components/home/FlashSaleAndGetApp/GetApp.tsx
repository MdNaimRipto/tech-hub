import React from "react";
import Image from "next/image";
import banner from "@/assets/get-app/get-app-bg.png";
import plaStore from "@/assets/get-app/get-app-play-store-link.webp";
import apple from "@/assets/get-app/get-app-apple-link.webp";
import phone from "@/assets/get-app/get-app-phone.webp";
import Link from "next/link";

const GetApp = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${banner.src})`,
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="flex items-center justify-center text-black"
    >
      <div>
        <p className="uppercase mb-4 font-semibold bg-input text-sm rounded-full p-1 w-1/4 text-center">
          Get App
        </p>
        <h2 className="text-3xl font-medium">
          Get Our <span className="text-secondary underline">Mobile App</span>
        </h2>
        <h2 className="text-3xl my-3">And Make Life Faster And Easier!</h2>
        <div className="flex items-center gap-4 mb-4">
          <Link href={"/"}>
            <Image src={plaStore} alt="Play Store App" />
          </Link>
          <Link href={"/"}>
            <Image src={apple} alt="Apple Store App" />
          </Link>
        </div>
        <Image src={phone} alt="Smart Phone Image" />
      </div>
    </div>
  );
};

export default GetApp;
