export default function getQuestion(
  questions: Question[],
  mode: Mode,
  exclude: Question[] = [],
): Question {
  const count = questions.filter(
    (country) => country.mode === mode && !exclude.includes(country),
  );
  return count[Math.floor(Math.random() * count.length)];
}
