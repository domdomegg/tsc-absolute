import { resolve } from 'node:path';

const fileMessageRegex = /^(.*)[(:](\d+)[,:](\d+)(?:\):\s+|\s+-\s+)(error|warning|info)\s+(TS\d+)\s*:\s*(.*)\r?\n$/;

export const lineMapper = (line: string): string => {
  const match = line.match(fileMessageRegex);
  if (!match || !match[1]) {
    return line;
  }

  const relativePath = match[1];
  const absolutePath = resolve(relativePath);
  return line.replace(relativePath, absolutePath);
};
