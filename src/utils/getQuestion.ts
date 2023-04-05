export default function getQuestion(countries: Question[], mode: Mode) {
  const count = countries.filter((country) => country.mode === mode);
  return count[Math.floor(Math.random() * count.length)];
}
