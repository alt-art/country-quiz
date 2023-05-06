import { useContext } from 'react';
import Card from './Card';
import { QuizContext } from '../context/QuizContext';
import Image from 'next/image';

function Question({ question }: any) {
  const { quiz, setQuiz } = useContext(QuizContext);

  const { selectedAnswer } = quiz;

  return (
    <div>
      <h2 className="m-3 text-3xl font-bold">{question.question}</h2>
      {question.flag && (
        <Image
          src={question.flag}
          alt={question.question}
          width={240}
          height={160}
          className="m-3 mx-auto h-40 w-auto rounded-lg"
        />
      )}
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {question.answers.map((answer: string, index: number) => (
          <Card
            key={index}
            active={index === selectedAnswer}
            onClick={() =>
              setQuiz((quiz) => ({ ...quiz, selectedAnswer: index }))
            }
            answer={answer}
          />
        ))}
      </div>
    </div>
  );
}

export default Question;
