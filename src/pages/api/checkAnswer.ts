import { NextApiRequest, NextApiResponse } from 'next';
import questions from '../../../questions.json';
import { CheckAnswerDto } from './dto';
import validate from './utils/validate';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: { message: 'Method not allowed' } });
    res.end();
    return;
  }
  const body = req.body;
  const errors = await validate(new CheckAnswerDto(body));
  if (errors) {
    res
      .status(400)
      .json({ error: { message: 'Invalid request body', errors } });
    res.end();
    return;
  }
  const { answer, id } = body;
  const question = questions.find((question) => question.id === id);
  if (!question) {
    res.status(400).json({ error: 'Question not found' });
    res.end();
  } else {
    res.status(200).json({ correct: question.correctAnswer === answer });
    res.end();
  }
}
