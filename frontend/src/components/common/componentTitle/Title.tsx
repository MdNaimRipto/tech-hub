import React from "react";

const Title = ({ title }: { title: string }) => {
  return (
    <h2 className="text-3xl text-black mb-12 font-semibold text-center">
      {title}
    </h2>
  );
};

export default Title;
