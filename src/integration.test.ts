import { test, expect } from 'vitest';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

test('help section not affected', () => {
  // Direct
  const resTsc = spawnSync(
    'tsc',
    ['--help'],
    { env: { PATH: process.env['PATH'] } },
  );
  expect(resTsc.error).toBe(undefined);
  expect(resTsc.stdout.toString().startsWith('tsc: The TypeScript Compiler')).toBe(true);
  expect(resTsc.stderr.toString()).toBe('');

  // Via tsc-absolute
  const resTscAbsolute = spawnSync(
    resolve(__dirname, 'test_run.js'),
    ['--help'],
    { env: { PATH: process.env['PATH'] } },
  );
  expect(resTscAbsolute.error).toBe(undefined);
  expect(resTscAbsolute.stdout.toString().startsWith('tsc: The TypeScript Compiler')).toBe(true);
  expect(resTscAbsolute.stderr.toString()).toBe('');

  expect(resTscAbsolute.stdout.toString()).toBe(resTsc.stdout.toString());
});

test('affects error messages correctly', () => {
  const res = spawnSync(
    resolve(__dirname, 'test_run.js'),
    ['--noEmit', resolve(__dirname, '..', 'test_data', 'example.ts')],
    { env: { PATH: process.env['PATH'] } },
  );
  expect(res.error).toBe(undefined);
  expect(res.stdout.toString()).toBe(`${process.cwd()}/test_data/example.ts(3,1): error TS2588: Cannot assign to 'x' because it is a constant.
${process.cwd()}/test_data/example.ts(5,7): error TS2322: Type 'number' is not assignable to type 'string'.
${process.cwd()}/test_data/example.ts(6,19): error TS2551: Property 'loog' does not exist on type 'Console'. Did you mean 'log'?
`);
  expect(res.stderr.toString()).toBe('');
});
