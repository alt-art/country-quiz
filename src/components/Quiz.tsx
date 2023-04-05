import { EnterOutlined, LoadingOutlined } from '@ant-design/icons';
import { useCallback, useContext, useEffect, useState } from 'react';
import { QuizContext } from '../context/QuizContext';
import Button from './Button';
import Steps from './Steps';
import Question from './Question';
import getQuestion from '../utils/getQuestion';
import { checkAnswer } from '../utils/quizAPI';
import QuizError from './QuizError';

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
    questionIndex,
    selectedAnswer,
    setError,
    error,
    question,
    setQuestion,
  } = useContext(QuizContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(() => {
    const answer = question.answers[selectedAnswer];
    if (!mode) {
      const mode = answer.toUpperCase() as Mode;
      setMode(mode);
      setQuestion(getQuestion(questions, mode));
      setSelectedAnswer(0);
    } else {
      setLoading(true);
      checkAnswer(question.id, answer).then((result) => {
        if (result.correct) {
          setSelectedAnswer(0);
          setQuestion(getQuestion(questions, mode));
          setQuestionIndex(questionIndex + 1);
        } else {
          setError(true);
        }
        setLoading(false);
      });
    }
  }, [
    setMode,
    mode,
    setQuestion,
    setSelectedAnswer,
    setQuestionIndex,
    questionIndex,
    setError,
    question,
    selectedAnswer,
    questions,
  ]);

  useEffect(() => {
    function keyPressHandler(e: KeyboardEvent) {
      const key = Number(e.key);
      if (key >= 1 && key <= questionsCount) {
        setSelectedAnswer(key - 1);
      }
      if (e.key === 'Enter') {
        handleSubmit();
      }
    }
    window.addEventListener('keyup', keyPressHandler);
    return () => {
      window.removeEventListener('keyup', keyPressHandler);
    };
  }, [questionIndex, questionsCount, setSelectedAnswer, handleSubmit]);

  return (
    <div className="flex min-h-full min-w-full flex-col px-3 dark:text-white sm:px-10 md:px-20">
      {!error ? (
        <>
          <Steps quantity={questionsCount} position={questionIndex} />
          <Question question={question} />
          <Button onClick={handleSubmit} disabled={loading}>
            <p className="text-xl font-bold">Enter</p>
            {!loading && <EnterOutlined style={{ fontSize: '1.5rem' }} />}
            {loading && (
              <LoadingOutlined
                style={{ fontSize: '1.5rem' }}
                className="animate-spin"
              />
            )}
          </Button>
        </>
      ) : (
        <QuizError />
      )}
    </div>
  );
}

export default Quiz;
