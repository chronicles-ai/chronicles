export function splitSentence(document: string) {
  return document.replace(/(?<=[^A-Z].[.?]) +(?=[A-Z])/g, '$1|').split('$1|');
}
