import Head from 'next/head';
import Quiz from '../components/Quiz';
import QuizProvider from '../context/QuizContext';

export default function Home() {
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
        <Quiz />
      </QuizProvider>
    </>
  );
}
