import * as mongoose from 'mongoose';
import {
  Group,
  TypeResponse,
} from '../../../../app/question/interfaces/question.interface';
import { ResponseQuestions } from '../../../../app/response-question/interfaces/response-questions.interface';

export const ResponseQuestionSchema = new mongoose.Schema<ResponseQuestions>({
  response: {
    type: String,
    enum: TypeResponse,
    required: true,
  },
  group: {
    type: String,
    enum: Group,
    required: true,
  },
  questionGroup: {
    type: Number,
    required: true,
  },
  sessionHash: {
    type: String,
    required: true,
  },
});

export const ResponseQuestionModel: mongoose.Model<ResponseQuestions> =
  mongoose.model('response-question', ResponseQuestionSchema);
