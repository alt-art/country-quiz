import { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

interface Props {
  active: boolean;
  onClick?: () => void;
  answer?: string;
}

function switchBgColor(
  active: boolean,
  correctAnswer: string | null,
  answer: string | undefined,
) {
  if (correctAnswer === answer) {
    return 'bg-green';
  }
  if (active) {
    if (correctAnswer) {
      return 'animate-wiggle bg-red/40';
    }
    return 'bg-primary/40';
  }
  return 'bg-primary/10';
}

export default function Card({ answer, active, onClick }: Props) {
  const { quiz } = useContext(QuizContext);
  const { correctAnswer } = quiz;

  return (
    <button
      className={`counter-increment m-2 rounded-md px-4 py-3 text-left transition-colors duration-300 ease-in-out
      ${switchBgColor(active, correctAnswer, answer)}
      `}
      disabled={correctAnswer !== null}
      onClick={onClick}
    >
      <span className="before:counter text-xl before:opacity-30">{answer}</span>
    </button>
  );
}
