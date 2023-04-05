import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CheckAnswerDto {
  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  constructor(body: any) {
    this.answer = body.answer;
    this.id = body.id;
  }
}
