export type IQuestions = {
  userUID: string;
  userName: string;
  productId: string;
  question: string;
  answer: string;
};

export type IUpdateQuestion = {
  userUID: string;
  newQuestion: string;
};

export type IAnswerQuestion = {
  userUID: string;
  answer: string;
};
