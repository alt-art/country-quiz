import { EnterOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { QuizContext } from '../context/QuizContext';
import Button from './Button';
import Card from './Card';

function Quiz() {
  const { questions, setQuestions, selectedAnswer, setSelectedAnswer } =
    useContext(QuizContext);

  return (
    <div className="flex min-h-full min-w-full flex-col px-3 sm:px-10 md:px-20">
      <h2 className="mx-3 text-2xl font-bold dark:text-white">Select a mode</h2>
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {questions[0].answers.map((answer, index) => (
          <Card
            key={index}
            active={index === selectedAnswer}
            onClick={() => setSelectedAnswer(index)}
            text={answer}
          />
        ))}
      </div>
      <div>
        <Button>
          <p className="text-xl font-bold">Enter</p>
          <EnterOutlined style={{ fontSize: '1.5rem' }} />
        </Button>
      </div>
    </div>
  );
}

export default Quiz;
