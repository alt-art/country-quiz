import { useContext } from 'react';
import { DefaultQuiz, QuizContext } from '../context/QuizContext';
import Button from './Button';

function WinModal() {
  const { setQuiz, quiz, questionsCount } = useContext(QuizContext);

  const { wrongAnswers, startTime } = quiz;
  const correctAnswers = questionsCount - wrongAnswers;
  const score = Math.round((correctAnswers / questionsCount) * 10);
  const totalTime = new Date().getTime() - startTime!.getTime();
  const minutes = Math.floor(totalTime / 1000 / 60);
  const seconds = Math.floor((totalTime / 1000) % 60);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/60 dark:bg-background-dark/60">
      <div className="flex h-full w-full flex-col justify-center bg-background p-4 shadow dark:bg-background-dark sm:h-fit sm:w-96 sm:rounded-lg">
        <h1 className="my-2 text-center text-2xl font-bold">You won!</h1>
        <p>
          Total time: {minutes}m {seconds}s
        </p>
        <p>Score: {score}/10</p>
        <p>Correct answers: {correctAnswers}</p>
        <p>Wrong answers: {wrongAnswers}</p>
        <hr className="my-2 border-background-dark/20 dark:border-white/20" />
        <div className="flex justify-center">
          <Button onClick={() => setQuiz(DefaultQuiz)}>
            <p className="font-bold">Play again</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WinModal;
