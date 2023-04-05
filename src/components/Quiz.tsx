import { EnterOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../context/QuizContext';
import Button from './Button';
import Steps from './Steps';
import Question from './Question';
import getQuestion from '../utils/getQuestion';

export interface Props {
  questions: Question[];
}

function Quiz({ questions }: Props) {
  const {
    questionsCount,
    setSelectedAnswer,
    setMode,
    mode,
    setQuestionIndex,
    selectedAnswer,
    questionIndex,
  } = useContext(QuizContext);

  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: '0',
    question: 'Select a mode to start',
    answers: ['Capitals', 'Flags', 'Continents', 'Languages'],
    flag: null,
    mode: null,
  });

  function handleSubmit() {
    setSelectedAnswer(0);
    setQuestionIndex(questionIndex + 1);
    if (!mode) {
      const mode = currentQuestion.answers[
        selectedAnswer
      ].toUpperCase() as Mode;
      setMode(mode);
      setCurrentQuestion(getQuestion(questions, mode));
      return;
    }
    setCurrentQuestion(getQuestion(questions, mode));
  }

  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent) {
      const key = Number(e.key);
      if (key >= 1 && key <= questionsCount) {
        setSelectedAnswer(key - 1);
      }
    }
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [questionIndex, questionsCount, setSelectedAnswer]);

  return (
    <div className="flex min-h-full min-w-full flex-col px-3 dark:text-white sm:px-10 md:px-20">
      <Steps quantity={questionsCount} position={questionIndex} />
      <Question question={currentQuestion} />
      <Button onClick={handleSubmit}>
        <p className="text-xl font-bold">Enter</p>
        <EnterOutlined style={{ fontSize: '1.5rem' }} />
      </Button>
    </div>
  );
}

export default Quiz;
