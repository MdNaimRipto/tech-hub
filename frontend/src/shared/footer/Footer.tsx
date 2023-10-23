import React from "react";
import { BsTelephone } from "react-icons/bs";
import { BiRightArrow } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import Link from "next/link";
import { Button } from "@mui/material";

const Footer = () => {
  return (
    <div className="bg-white mb-6 md:mb-12 lg:mb-0">
      <div className="sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 mx-auto">
        <footer className="footer mx-auto px-4 py-12 font-normal bg-white text-black">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:justify-items-center">
            <div>
              <div>
                <h4 className="text-2xl font-medium mt-3 mb-6 text-black">
                  Contact US
                </h4>
                <p className="leading-5 text-xs">
                  Contact us online or offline to share your requirement or
                  problem. We will try our best to solve your issue or needs.
                </p>
                <div className="mt-3">
                  <div className="flex items-center mb-2">
                    <BsTelephone className="text-primary mr-2 text-sm" />
                    <span className="text-sm">+880-163-297-0990</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <IoLocationOutline className="text-primary mr-2 text-sm" />
                    <span className="text-sm">Mirpur, Dhaka</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <HiOutlineMail className="text-primary mr-2 text-sm" />
                    <span className="text-sm">techMart@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-medium mt-3 mb-6 text-black">
                Quick Links
              </h4>
              <ul>
                <li className="mb-3 hover:translate-x-2 cursor-pointer duration-300 hover:text-primary flex items-center">
                  <BiRightArrow className="mr-2 text-primary" />
                  <span className="text-sm">About Us</span>
                </li>
                <li className="mb-3 hover:translate-x-2 cursor-pointer duration-300 hover:text-primary flex items-center">
                  <BiRightArrow className="mr-2 text-primary" />
                  <span className="text-sm">Updated News</span>
                </li>
                <li className="mb-3 hover:translate-x-2 cursor-pointer duration-300 hover:text-primary flex items-center">
                  <BiRightArrow className="mr-2 text-primary" />
                  <span className="text-sm">Terms Of Service</span>
                </li>
                <li className="mb-3 hover:translate-x-2 cursor-pointer duration-300 hover:text-primary flex items-center">
                  <BiRightArrow className="mr-2 text-primary" />
                  <span className="text-sm">Privacy policy</span>
                </li>
                <li className="mb-3 hover:translate-x-2 cursor-pointer duration-300 hover:text-primary flex items-center">
                  <BiRightArrow className="mr-2 text-primary" />
                  <span className="text-sm">Our Deals</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-medium mt-3 mb-6 text-black">
                Support Center
              </h4>
              <ul>
                <li className="mb-3 hover:translate-x-2 cursor-pointer duration-300 hover:text-primary flex items-center">
                  <BiRightArrow className="mr-2 text-primary" />
                  <span className="text-sm">{"FAQ's"}</span>
                </li>
                <li className="mb-3 hover:translate-x-2 cursor-pointer duration-300 hover:text-primary flex items-center">
                  <BiRightArrow className="mr-2 text-primary" />
                  <span className="text-sm"> Contact Us</span>
                </li>
                <li className="mb-3 hover:translate-x-2 cursor-pointer duration-300 hover:text-primary flex items-center">
                  <BiRightArrow className="mr-2 text-primary" />
                  <span className="text-sm"> Sitemap</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-medium mt-3 mb-6 text-black">
                Newsletter
              </h4>
              <div>
                <p className="leading-5 text-xs">
                  Subscribe Our Newsletter To Get Latest Update And News
                </p>
                <div>
                  <input
                    className="py-3 px-3 w-full mt-6 mb-3 rounded border border-input"
                    placeholder="demo@gmail.com"
                  />
                  <Button
                    sx={{
                      paddingY: "12px",
                      width: "100%",
                      borderRadius: "4px",
                      fontWeight: 500,
                      background:
                        "linear-gradient(to bottom left, #f15700, #ff7a1a) !important",
                      color: "white",
                    }}
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <footer className="footer mx-auto px-10 py-8 border-t bg-white text-black font-normal border-input">
          <div className="container flex items-center justify-between">
            <div className="items-center grid-flow-col">
              <p className="text-xs md:text-base">
                Copyright © 2023. All Right Reserved to Recycle Hub.
              </p>
            </div>
            <div className="md:place-self-center md:justify-self-end">
              <div className="grid grid-flow-col gap-4">
                <Link href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </Link>
                <Link href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </Link>
                <Link href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
