import React from "react";

const Subscribe = () => {
  return (
    <div className="bg-input">
      <div className="mb-16 w-full flex flex-col md:flex-row items-center justify-center md:justify-between md:px-10 h-36 container px-4">
        <h4 className="text-black text-sm md:text-lg lg:text-2xl mb-4 md:mb-0 font-medium">
          <span className="mr-1 md:mr-2">Subscribe Now Get</span> |{" "}
          <span className="mr-1 md:ml-2">25% Off first purchase!</span>
        </h4>
        <input
          placeholder="Subscribe Now!"
          className="p-3 rounded-lg focus:outline-none w-full md:w-[40%] mb-2 md:mb-0"
        />
      </div>
    </div>
  );
};

export default Subscribe;
