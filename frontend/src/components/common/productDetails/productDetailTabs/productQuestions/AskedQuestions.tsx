import React from "react";
import { Avatar } from "@mui/material";

const AskedQuestions = () => {
  return (
    <div className="mt-8 px-4">
      {[1, 2, 3, 4, 5].map((question, i) => (
        <div className="flex items-start gap-4 mb-3" key={i}>
          <Avatar
            alt="User Avatar"
            src="https://i.ibb.co/dcHVrp8/User-Profile-PNG-Image.png"
            sx={{ width: 45, height: 45 }}
          />
          <div className="font-medium text-black">
            <h4 className="text-lg mb-2">MD Naimur Rahman</h4>
            <p className="text-sm leading-6 mb-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Laboriosam nemo beatae est consectetur maiores expedita quo.
              Voluptatem, tempore! Excepturi adipisci dolor consequatur
              voluptatibus praesentium iste dolores laborum ullam maiores. Ea.
            </p>
            <div className="flex items-end ml-2 mb-3">
              <p className="border-l border-l-light-gray h-8 border-b border-b-light-gray w-10"></p>
              <h4 className="my-0 py-0 h-[12px] text-sm font-semibold text-black ml-1">
                Reply: <span className="font-medium">Yes sir it can.</span>
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AskedQuestions;
