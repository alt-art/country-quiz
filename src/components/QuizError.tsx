import { EnterOutlined } from '@ant-design/icons';
import Button from './Button';
import { DefaultQuestion, QuizContext } from '../context/QuizContext';
import { useCallback, useContext, useEffect } from 'react';

function QuizError() {
  const {
    setError,
    setQuestionIndex,
    setSelectedAnswer,
    setQuestion,
    setMode,
  } = useContext(QuizContext);

  const handleReset = useCallback(() => {
    setMode(null);
    setQuestion(DefaultQuestion);
    setQuestionIndex(0);
    setSelectedAnswer(0);
    setError(false);
  }, [setError, setQuestionIndex, setSelectedAnswer, setQuestion, setMode]);

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
