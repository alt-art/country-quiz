import { createContext, useState } from 'react';

interface Question {
  question: string;
  answers: string[];
  correctAnswer?: number;
}

interface QuizContextProps {
  selectedAnswer: number;
  setSelectedAnswer: (selectedAnswer: number) => void;
  questions: Question[];
  setQuestions: (question: Question[]) => void;
  mode?: string;
  setMode: (mode: string) => void;
}

export const QuizContext = createContext<QuizContextProps>({
  selectedAnswer: 0,
  setSelectedAnswer: () => {},
  questions: [],
  setQuestions: () => {},
  mode: undefined,
  setMode: () => {},
});

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [mode, setMode] = useState<string>();
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: 'Select a mode',
      answers: ['Capitals', 'Flags', 'Continents', 'Languages'],
      correctAnswer: undefined,
    },
  ]);

  return (
    <QuizContext.Provider
      value={{
        selectedAnswer,
        setSelectedAnswer,
        questions,
        setQuestions,
        mode,
        setMode,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export default QuizProvider;