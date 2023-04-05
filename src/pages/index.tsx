import Head from 'next/head';
import Quiz from '../components/Quiz';
import QuizProvider from '../context/QuizContext';
import questions from '../assets/questions.json';
import { InferGetStaticPropsType } from 'next';

export async function getStaticProps() {
  return {
    props: {
      questions: questions.map((question) => ({
        id: question.id,
        question: question.question,
        answers: question.answers,
        mode: question.mode as Mode,
        flag: question.flag,
      })),
    },
  };
}

export default function Home({
  questions,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Country Quiz</title>
        <meta
          name="description"
          content="Test your knowledge about countries"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QuizProvider>
        <Quiz questions={questions} />
      </QuizProvider>
    </>
  );
}
