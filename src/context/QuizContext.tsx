import { createContext, useState } from 'react';

interface Quiz {
  questionIndex: number;
  mode: Mode | null;
  correctAnswer: string | null;
  questions: Question[];
  wrongAnswers: number;
  startTime: Date | null;
  selectedAnswer: number;
}

interface QuizContextProps {
  questionsCount: number;
  setQuestionsCount: (questionsCount: number) => void;
  quiz: Quiz;
  setQuiz: (quiz: Quiz | ((quiz: Quiz) => Quiz)) => void;
}

export const DefaultQuestion = {
  id: '0',
  question: 'Select a mode to start',
  answers: ['Capitals', 'Flags', 'Continents', 'Languages'],
  flag: null,
  mode: null,
};

export const DefaultQuiz: Quiz = {
  questionIndex: 0,
  mode: null,
  correctAnswer: null,
  questions: [DefaultQuestion],
  wrongAnswers: 0,
  startTime: null,
  selectedAnswer: 0,
};

export const QuizContext = createContext<QuizContextProps>({
  questionsCount: 0,
  setQuestionsCount: () => {},
  quiz: DefaultQuiz,
  setQuiz: () => {},
});

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [questionsCount, setQuestionsCount] = useState(10);
  const [quiz, setQuiz] = useState(DefaultQuiz);

  return (
    <QuizContext.Provider
      value={{
        questionsCount,
        setQuestionsCount,
        quiz,
        setQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export default QuizProvider;
