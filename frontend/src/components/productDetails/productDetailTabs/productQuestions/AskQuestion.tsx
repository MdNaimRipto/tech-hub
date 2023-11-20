import SubmitBtn from "@/components/common/buttons/SubmitBtn";
import { useUserContext } from "@/context/AuthContext";
import React, { useState, useEffect } from "react";

const AskQuestion = () => {
  const { user } = useUserContext();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (user) {
      setUserName(user.name);
    } else {
      setUserName("Anonymous User");
    }
  }, [user]);
  const handleAskQuestion = (e: any) => {
    e.preventDefault();
    const question = e.target.question.value;
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
      <SubmitBtn title="Ask Question" />
    </form>
  );
};

export default AskQuestion;
