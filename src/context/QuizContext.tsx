import { createContext, useState } from 'react';

interface QuizContextProps {
  questionIndex: number;
  setQuestionIndex: (questionIndex: number) => void;
  questionsCount: number;
  setQuestionsCount: (questionsCount: number) => void;
  selectedAnswer: number;
  setSelectedAnswer: (selectedAnswer: number) => void;
  mode: Mode | null;
  setMode: (mode: Mode | null) => void;
}

export const QuizContext = createContext<QuizContextProps>({
  questionIndex: 0,
  setQuestionIndex: () => {},
  questionsCount: 0,
  setQuestionsCount: () => {},
  selectedAnswer: 0,
  setSelectedAnswer: () => {},
  mode: null,
  setMode: () => {},
});

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(5);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [mode, setMode] = useState<Mode | null>(null);

  return (
    <QuizContext.Provider
      value={{
        questionIndex,
        setQuestionIndex,
        questionsCount,
        setQuestionsCount,
        selectedAnswer,
        setSelectedAnswer,
        mode,
        setMode,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export default QuizProvider;
