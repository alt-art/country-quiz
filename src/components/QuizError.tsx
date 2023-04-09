import Button from './Button';
import { DefaultQuiz, QuizContext } from '../context/QuizContext';
import { useCallback, useContext } from 'react';

function QuizError() {
  const { setSelectedAnswer, setQuiz } = useContext(QuizContext);

  const handleReset = useCallback(() => {
    setQuiz(DefaultQuiz);
    setSelectedAnswer(0);
  }, [setSelectedAnswer, setQuiz]);

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl">Wrong answer</h1>
      <p>Try again!</p>
      <Button onClick={handleReset}>
        <p className="text-xl font-bold">Return to mode selection</p>
      </Button>
    </div>
  );
}

export default QuizError;
