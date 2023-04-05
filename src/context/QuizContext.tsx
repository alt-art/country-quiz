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
  error: boolean;
  setError: (error: boolean) => void;
  question: Question;
  setQuestion: (question: Question) => void;
}

export const DefaultQuestion = {
  id: '0',
  question: 'Select a mode to start',
  answers: ['Capitals', 'Flags', 'Continents', 'Languages'],
  flag: null,
  mode: null,
};

export const QuizContext = createContext<QuizContextProps>({
  questionIndex: 0,
  setQuestionIndex: () => {},
  questionsCount: 0,
  setQuestionsCount: () => {},
  selectedAnswer: 0,
  setSelectedAnswer: () => {},
  mode: null,
  setMode: () => {},
  error: false,
  setError: () => {},
  question: DefaultQuestion,
  setQuestion: () => {},
});

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(5);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [error, setError] = useState(false);
  const [mode, setMode] = useState<Mode | null>(null);
  const [question, setQuestion] = useState<Question>(DefaultQuestion);

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
        error,
        setError,
        question,
        setQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export default QuizProvider;
