import { useContext } from 'react';
import Card from './Card';
import { QuizContext } from '../context/QuizContext';
import Image from 'next/image';

function Question({ question }: any) {
  const { selectedAnswer, setSelectedAnswer, quiz } = useContext(QuizContext);

  return (
    <div>
      <h2 className="m-3 text-3xl font-bold">{question.question}</h2>
      {question.flag && (
        <Image
          src={question.flag}
          alt={question.question}
          width={300}
          height={200}
          className="m-3 mx-auto rounded-lg"
        />
      )}
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {question.answers.map((answer: any, index: any) => (
          <Card
            key={index}
            active={index === selectedAnswer}
            onClick={() => setSelectedAnswer(index)}
            answer={answer}
          />
        ))}
      </div>
    </div>
  );
}

export default Question;
