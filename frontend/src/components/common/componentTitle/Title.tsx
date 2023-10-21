import React from "react";

type ITitle = { title: string; subTitle: string };

const Title = ({ title, subTitle }: ITitle) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl text-black mb-3 font-semibold text-center">
        {title}
      </h2>
      <p className="text-lg text-black text-center">{subTitle}</p>
    </div>
  );
};

export default Title;
