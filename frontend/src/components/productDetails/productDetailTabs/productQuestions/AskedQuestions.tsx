import React from "react";
import { Avatar } from "@mui/material";
import { useGetProductsQuestionsQuery } from "@/redux/features/questions/questionApis";
import { IQuestions } from "@/types/questionsTypes/questionTypes";
import CommonLoader from "@/components/common/Loaders/commonLoader/CommonLoader";
import NotFoundMessage from "@/components/common/notFoundMessage/NotFoundMessage";

const AskedQuestions = ({ productId }: { productId: string }) => {
  const { data, isLoading, refetch } = useGetProductsQuestionsQuery({
    id: productId,
  });

  if (isLoading) {
    return <CommonLoader />;
  }

  const questions = data.data as IQuestions[];

  if (!questions.length) {
    return (
      <NotFoundMessage heightStyle="h-[200px]" title="No Questions Asked" />
    );
  }

  return (
    <div className="mt-8 px-4">
      {questions.map(question => (
        <div className="flex items-start gap-4 mb-3" key={question._id}>
          <Avatar
            alt="User Avatar"
            src={"https://i.ibb.co/dcHVrp8/User-Profile-PNG-Image.png"}
            sx={{ width: 45, height: 45 }}
          />
          <div className="font-medium text-black">
            <h4 className="text-lg mb-2">{question.userName}</h4>
            <p className="text-sm leading-6 mb-2">{question.question}</p>
            <div className="flex items-end ml-2 mb-3">
              <p className="border-l border-l-light-gray h-8 border-b border-b-light-gray w-10"></p>
              <h4 className="my-0 py-0 h-[12px] text-sm font-semibold text-black ml-1">
                Reply: <span className="font-medium">{question.answer}</span>
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AskedQuestions;
