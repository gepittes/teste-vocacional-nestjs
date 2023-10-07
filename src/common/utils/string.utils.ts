export const clearString = (String: string): string => {
  if (typeof String !== 'string') {
    throw new Error('You do not passed string from params');
  }

  return String.replace(/\s+/g, ' ').trim();
};
