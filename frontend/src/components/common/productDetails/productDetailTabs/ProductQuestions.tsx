import React from "react";
import SubmitBtn from "../../buttons/SubmitBtn";

const ProductQuestions = () => {
  return (
    <div className="min-h-[200px]">
      <form>
        <textarea
          placeholder="Write a Question"
          className="p-5 w-full rounded border border-light-gray my-4 focus:outline-none"
          rows={3}
        />
        <SubmitBtn title="Ask Question" />
      </form>
    </div>
  );
};

export default ProductQuestions;
