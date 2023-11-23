import React, { useState } from "react";
import { TableCell } from "@mui/material";
import { Button } from "@mui/material";
import { useAnswerQuestionMutation } from "@/redux/features/questions/questionApis";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const TableBodyAnswerQuestionForm = ({ id }: { id: string }) => {
  const { token, user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const [answerQuestion] = useAnswerQuestionMutation();
  const handleAnswer = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const form = e.target;
    const answer = form.answer.value;
    const option = {
      data: {
        userUID: user?.uid,
        answer: answer,
      },
      token: token,
      id: id,
    };

    try {
      const res = await answerQuestion(option).unwrap();
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
    <TableCell
      component="th"
      scope="row"
      align="left"
      sx={{ whiteSpace: "nowrap" }}
    >
      <form onSubmit={handleAnswer}>
        <input
          name="answer"
          placeholder="Answer Question"
          className="border border-input p-2 rounded mr-3 focus:outline-none"
          required
        />
        <Button
          type="submit"
          sx={{
            color: "#ffffff",
            background: "linear-gradient(#f15700, #ff7a1a) !important",
            p: "8px",
            zIndex: 1,
          }}
        >
          {isLoading ? (
            <CircularProgress
              sx={{ color: "#ffffff", marginLeft: 1 }}
              size={24}
            />
          ) : (
            "Answer"
          )}
        </Button>
      </form>
    </TableCell>
  );
};

export default TableBodyAnswerQuestionForm;
