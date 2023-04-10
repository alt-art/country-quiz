import { EnterOutlined, LoadingOutlined } from '@ant-design/icons';
import { useCallback, useContext, useEffect, useState } from 'react';
import { DefaultQuiz, QuizContext } from '../context/QuizContext';
import Button from './Button';
import Steps from './Steps';
import Question from './Question';
import getQuestion from '../utils/getQuestion';
import { checkAnswer } from '../utils/quizAPI';

export interface Props {
  questions: Question[];
}

function Quiz({ questions: qts }: Props) {
  const { questionsCount, setSelectedAnswer, selectedAnswer, quiz, setQuiz } =
    useContext(QuizContext);

  const [loading, setLoading] = useState(false);

  const { questions, questionIndex, correctAnswer: error } = quiz;

  const question = questions[questionIndex];

  const handleSubmit = useCallback(() => {
    const { mode, correctAnswer: error, questionIndex } = quiz;
    if (error) {
      setQuiz(DefaultQuiz);
      return;
    }
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
          setQuiz({ ...quiz, correctAnswer: result.correctAnswer });
        }
        setLoading(false);
      });
    }
  }, [
    setSelectedAnswer,
    setQuiz,
    quiz,
    questions,
    selectedAnswer,
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
      e.stopPropagation();
    }
    window.addEventListener('keyup', keyPressHandler);
    return () => {
      window.removeEventListener('keyup', keyPressHandler);
    };
  }, [questionIndex, questionsCount, setSelectedAnswer, handleSubmit]);

  return (
    <div className="flex min-h-full min-w-full flex-col px-3 dark:text-white sm:px-10 md:px-20">
      <Steps />
      <Question question={question} />
      <Button onClick={handleSubmit} disabled={loading}>
        <p className="text-xl font-bold">{error ? 'Go back' : 'Enter'}</p>
        {!loading ? (
          <EnterOutlined className="text-2xl/[0]" />
        ) : (
          <LoadingOutlined className="text-2xl/[0] animate-spin" />
        )}
      </Button>
    </div>
  );
}

export default Quiz;
