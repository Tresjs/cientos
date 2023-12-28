const numbersAtEnd = /[0-9]*$/;
const underscoresNumbersAtEnd = /_*[0-9]*$/;

export function stripUnderscoresNumbersFromEnd(str: string) {
  return str.replace(underscoresNumbersAtEnd, "");
}

export function getNumbersFromEnd(str: string) {
  const matches = str.match(numbersAtEnd);
  if (matches) {
    return parseInt(matches[matches.length - 1]);
  }
  return null;
}