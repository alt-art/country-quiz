import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';

interface Country {
  name: {
    common: string;
  };
  capital: string[];
  flags: {
    svg: string;
  };
  region: string;
  languages: {
    [key: string]: string;
  };
  population: number;
}

enum Mode {
  CAPITALS = 'CAPITALS',
  FLAGS = 'FLAGS',
  CONTINENTS = 'CONTINENTS',
  LANGUAGES = 'LANGUAGES',
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const countries = (await response.json()) as Country[];
  const count = countries
    .filter((country) => country.capital && country.population > 2000000)
    .sort((a, b) => b.population - a.population);
  const questions = genQuestions(count);
  await fs.writeFile('./questions.json', JSON.stringify(questions, null, 2));
  res.status(200).json(questions);
}

interface Question {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
  flag: string | null;
  mode: Mode;
}

function getRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function shuffle<T>(array: T[]): T[] {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function genQuestionLang(countries: Country[], country: Country): Question {
  let answers = new Set<string>();
  answers.add(Object.values(country.languages)[0]);
  while (answers.size < 4) {
    answers.add(Object.values(getRandom(countries).languages)[0]);
  }
  return {
    id: uuidv4(),
    question: `What is the language of ${country.name.common}?`,
    answers: shuffle(Array.from(answers)),
    correctAnswer: Object.values(country.languages)[0],
    flag: null,
    mode: Mode.LANGUAGES,
  };
}

function genQuestionCont(countries: Country[], country: Country): Question {
  let answers = new Set<string>();
  answers.add(country.region);
  while (answers.size < 4) {
    answers.add(getRandom(countries).region);
  }
  return {
    id: uuidv4(),
    question: `What continent is ${country.name.common} in?`,
    answers: shuffle(Array.from(answers)),
    correctAnswer: country.region,
    flag: null,
    mode: Mode.CONTINENTS,
  };
}

function genQuestionFlag(countries: Country[], country: Country): Question {
  let answers = new Set<string>();
  answers.add(country.name.common);
  while (answers.size < 4) {
    answers.add(getRandom(countries).name.common);
  }
  return {
    id: uuidv4(),
    question: `What country does this flag belong to?`,
    answers: shuffle(Array.from(answers)),
    correctAnswer: country.name.common,
    flag: country.flags.svg,
    mode: Mode.FLAGS,
  };
}

function genQuestionCap(countries: Country[], country: Country): Question {
  let answers = new Set<string>();
  answers.add(country.capital[0]);
  while (answers.size < 4) {
    answers.add(getRandom(countries).capital[0]);
  }
  return {
    id: uuidv4(),
    question: `What is the capital of ${country.name.common}?`,
    answers: shuffle(Array.from(answers)),
    correctAnswer: country.capital[0],
    flag: null,
    mode: Mode.CAPITALS,
  };
}

function genQuestions(countries: Country[]): Question[] {
  let questions = [];
  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];
    questions.push(genQuestionCap(countries, country));
    questions.push(genQuestionFlag(countries, country));
    questions.push(genQuestionCont(countries, country));
    questions.push(genQuestionLang(countries, country));
  }
  return questions;
}
