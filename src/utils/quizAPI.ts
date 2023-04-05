import axios from 'axios';

const quizAPI = axios.create({
  baseURL: '/api/',
});

export async function checkAnswer(id: string, answer: string) {
  return (await quizAPI.post<CheckAnswer>('/checkAnswer', { id, answer })).data;
}
