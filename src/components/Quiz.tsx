import { EnterOutlined, LoadingOutlined } from '@ant-design/icons';
import { useCallback, useContext, useEffect, useState } from 'react';
import { QuizContext } from '../context/QuizContext';
import Button from './Button';
import Steps from './Steps';
import Question from './Question';
import getQuestion from '../utils/getQuestion';
import { checkAnswer } from '../utils/quizAPI';
import WinModal from './WinModal';

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
    const { mode, correctAnswer: error } = quiz;
    const answer = question.answers[selectedAnswer];
    if (!mode) {
      const mode = answer.toUpperCase() as Mode;
      setSelectedAnswer(0);
      setQuiz((quiz) => ({
        ...quiz,
        questionIndex: 1,
        mode,
        questions: [...quiz.questions, getQuestion(qts, mode, quiz.questions)],
        startTime: new Date(),
      }));
      return;
    }
    if (error) {
      setQuiz((quiz) => ({
        ...quiz,
        correctAnswer: null,
        questions: [...quiz.questions, getQuestion(qts, mode, quiz.questions)],
        questionIndex: quiz.questionIndex + 1,
      }));
      return;
    }
    setLoading(true);
    checkAnswer(question.id, answer).then((result) => {
      if (result.correct) {
        setSelectedAnswer(0);
        setQuiz((quiz) => ({
          ...quiz,
          questionIndex: quiz.questionIndex + 1,
          questions: [
            ...quiz.questions,
            getQuestion(qts, mode, quiz.questions),
          ],
        }));
      } else {
        setQuiz((quiz) => ({
          ...quiz,
          correctAnswer: result.correctAnswer,
          wrongAnswers: quiz.wrongAnswers + 1,
        }));
      }
      setLoading(false);
    });
  }, [setSelectedAnswer, setQuiz, quiz, selectedAnswer, question, qts]);

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
        <p className="text-xl font-bold">{error ? 'Next' : 'Enter'}</p>
        {!loading ? (
          <EnterOutlined className="text-2xl/[0]" />
        ) : (
          <LoadingOutlined className="mx-2 animate-spin text-2xl/[0]" />
        )}
      </Button>
      {questionIndex === questionsCount + 1 && <WinModal />}
    </div>
  );
}

export default Quiz;
