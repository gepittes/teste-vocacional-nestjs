import { Document } from 'mongodb';

export const convertToJson = <TypeObject>(
  mongooseDocument: Document,
): TypeObject => {
  return JSON.parse(JSON.stringify(mongooseDocument));
};
