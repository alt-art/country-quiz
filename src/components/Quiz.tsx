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

function Quiz({ questions: qts }: Props) {
  const { questionsCount, setSelectedAnswer, selectedAnswer, quiz, setQuiz } =
    useContext(QuizContext);

  const [loading, setLoading] = useState(false);

  const { questions, questionIndex, error, mode } = quiz;

  const question = questions[questionIndex];

  const handleSubmit = useCallback(() => {
    const answer = question.answers[selectedAnswer];
    if (!mode) {
      const mode = answer.toUpperCase() as Mode;
      setSelectedAnswer(0);
      setQuiz({
        ...quiz,
        questionIndex: 1,
        mode,
        questions: [...questions, getQuestion(qts, mode, questions)],
      });
    } else {
      setLoading(true);
      checkAnswer(question.id, answer).then((result) => {
        if (result.correct) {
          setSelectedAnswer(0);
          setQuiz({
            ...quiz,
            questionIndex: questionIndex + 1,
            questions: [...questions, getQuestion(qts, mode, questions)],
          });
        } else {
          setQuiz({ ...quiz, error: true });
        }
        setLoading(false);
      });
    }
  }, [
    setSelectedAnswer,
    setQuiz,
    quiz,
    mode,
    questions,
    selectedAnswer,
    questionIndex,
    question,
    qts,
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
          <Steps
            quantity={questionsCount}
            position={questionIndex > 0 ? questionIndex - 1 : 0}
          />
          <Question question={question} />
          <Button onClick={handleSubmit} disabled={loading}>
            <p className="text-xl font-bold">Enter</p>
            {!loading && <EnterOutlined style={{ fontSize: '1.5rem' }} />}
            {loading && (
              <LoadingOutlined
                style={{ fontSize: '1.5rem' }}
                className="mx-2 animate-spin"
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
