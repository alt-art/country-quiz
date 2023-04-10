declare enum Mode {
  CAPITALS = 'CAPITALS',
  FLAGS = 'FLAGS',
  CONTINENTS = 'CONTINENTS',
  LANGUAGES = 'LANGUAGES',
}

interface Question {
  id: string;
  question: string;
  answers: string[];
  flag: string | null;
  mode: Mode | null;
}

interface CheckAnswer {
  correct: boolean;
  correctAnswer: string;
}
