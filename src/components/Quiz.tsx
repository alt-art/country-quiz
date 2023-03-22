import { EnterOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../context/QuizContext';
import Button from './Button';
import Card from './Card';
import Steps from './Steps';

function Quiz() {
  const {
    questionsCount,
    questions,
    selectedAnswer,
    setSelectedAnswer,
    questionIndex,
    setQuestionIndex,
    setMode,
  } = useContext(QuizContext);

  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent) {
      const key = Number(e.key);
      if (key >= 1 && key <= questions[questionIndex].answers.length) {
        setSelectedAnswer(key - 1);
      }
    }
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [questions, questionIndex, setSelectedAnswer]);

  const question = questions[questionIndex];

  return (
    <div className="flex min-h-full min-w-full flex-col px-3 dark:text-white sm:px-10 md:px-20">
      {question && (
        <>
          <Steps quantity={questionsCount} position={questionIndex} />
          <h2 className="m-3 text-3xl font-bold">{question.question}</h2>
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {question.answers.map((answer, index) => (
              <Card
                key={index}
                active={index === selectedAnswer}
                onClick={() => setSelectedAnswer(index)}
              >
                <span className="text-xl opacity-30">{index + 1}. </span>
                <span className="text-xl">{answer}</span>
              </Card>
            ))}
          </div>
          <Button
            onClick={() => {
              if (!question.correctAnswer) {
                setMode(question.answers[selectedAnswer]);
              }
              if (questionIndex + 1 < questionsCount) {
                setQuestionIndex(questionIndex + 1);
              }
              setSelectedAnswer(0);
            }}
          >
            <p className="text-xl font-bold">Enter</p>
            <EnterOutlined style={{ fontSize: '1.5rem' }} />
          </Button>
        </>
      )}
    </div>
  );
}

export default Quiz;
