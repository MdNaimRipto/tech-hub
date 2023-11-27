import SubmitBtn from "@/components/common/buttons/SubmitBtn";
import { envConfig } from "@/config/envConfig";
import { useUserContext } from "@/context/AuthContext";
import { useAskQuestionMutation } from "@/redux/features/questions/questionApis";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AskQuestion = ({ productId }: { productId: string }) => {
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const [askQuestion] = useAskQuestionMutation();

  const handleAskQuestion = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const form = e.target;
    const question = form.question.value;

    const option = {
      data: {
        userUID: user ? user.uid : envConfig.anonymous_user_uid,
        userName: user ? user.name : "Anonymous User",
        productId: productId,
        question: question,
      },
    };

    try {
      const res = await askQuestion(option).unwrap();
      if (res.success) {
        toast.success(res.message);
        setIsLoading(false);
        form.reset();
      }
    } catch (error: any) {
      console.log("Error:", error);
      toast.error(error.data.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleAskQuestion} className="pb-8 border-b border-b-input">
      <textarea
        name="question"
        id="question"
        placeholder="Ask a Question"
        className="p-2 w-full rounded border-b border-b-light-gray my-4 focus:outline-none"
        required
        maxLength={200}
      />
      <SubmitBtn title="Ask Question" isLoading={isLoading} />
    </form>
  );
};

export default AskQuestion;
