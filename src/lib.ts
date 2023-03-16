import { resolve } from 'node:path';

const fileNoPrettyMessageRegex = /^(.*)\((\d+),(\d+)\):\s+(error|warning|info)\s+(TS\d+)\s*:\s*(.*)\r?\n$/;
// eslint-disable-next-line no-control-regex
const filePrettyColorMessageRegex = /^\[96m(.*)\[0m:\[93m(\d+)\[0m:\[93m(\d+)\[0m\s+-\s+\[91m(error|warning|info)\[0m\[90m\s+(TS\d+)\s*:\s*\[0m(.*)\r?\n$/;
const filePrettyNoColorMessageRegex = /^(.*):(\d+):(\d+)\s+-\s+(error|warning|info)\s+(TS\d+)\s*:\s*(.*)\r?\n$/;

export const lineMapper = (line: string): string => {
  const match = line.match(fileNoPrettyMessageRegex)
    ?? line.match(filePrettyColorMessageRegex)
    ?? line.match(filePrettyNoColorMessageRegex);
  if (!match || !match[1]) {
    return line;
  }

  const relativePath = match[1];
  const absolutePath = resolve(relativePath);
  return line.replace(relativePath, absolutePath);
};
