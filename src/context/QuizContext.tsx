import { createContext, useState } from 'react';

interface Quiz {
  questionIndex: number;
  mode: Mode | null;
  correctAnswer: string | null;
  questions: Question[];
  wrongAnswers: number;
  startTime: Date | null;
}

interface QuizContextProps {
  questionsCount: number;
  setQuestionsCount: (questionsCount: number) => void;
  selectedAnswer: number;
  setSelectedAnswer: (selectedAnswer: number) => void;
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
};

export const QuizContext = createContext<QuizContextProps>({
  questionsCount: 0,
  setQuestionsCount: () => {},
  selectedAnswer: 0,
  setSelectedAnswer: () => {},
  quiz: DefaultQuiz,
  setQuiz: () => {},
});

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [questionsCount, setQuestionsCount] = useState(10);
  const [selectedAnswer, setSelected] = useState(0);
  const [quiz, setQuiz] = useState(DefaultQuiz);

  const setSelectedAnswer = (selectedAnswer: number) => {
    if (quiz.correctAnswer) return;
    setSelected(selectedAnswer);
  };

  return (
    <QuizContext.Provider
      value={{
        questionsCount,
        setQuestionsCount,
        selectedAnswer,
        setSelectedAnswer,
        quiz,
        setQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export default QuizProvider;
