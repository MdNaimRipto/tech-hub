import CommonLoader from "@/components/common/Loaders/commonLoader/CommonLoader";
import NotFoundMessage from "@/components/common/notFoundMessage/NotFoundMessage";
import QuestionsTable from "@/components/common/tables/QuestionsTable";
import { useUserContext } from "@/context/AuthContext";
import AdminLayout from "@/layouts/AdminLayout";
import { useGetAllQuestionsQuery } from "@/redux/features/questions/questionApis";
import { IQuestions } from "@/types/questionsTypes/questionTypes";
import React, { ReactElement, useEffect } from "react";

const ProductQuestions = () => {
  const { token, user } = useUserContext();
  const { data, isLoading, refetch } = useGetAllQuestionsQuery({
    token: token,
  });

  if (isLoading) {
    return <CommonLoader />;
  }

  const questions = data.data as IQuestions[];

  if (!questions.length) {
    return (
      <NotFoundMessage heightStyle="h-screen" title="No Questions Found" />
    );
  }

  setInterval(() => {
    window.location.reload();
  }, 1800000);

  return (
    <div className="pb-12 lg:pb-0 my-12 lg:mx-4">
      <QuestionsTable questions={questions} />
    </div>
  );
};

export default ProductQuestions;

ProductQuestions.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
