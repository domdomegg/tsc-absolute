import {
  test, expect, vi, beforeAll,
} from 'vitest';
import { lineMapper } from './lib';

const noChange = (line: string) => [line, line];

beforeAll(() => {
  vi.spyOn(process, 'cwd').mockReturnValue('/my-workspace/my-package');
});

test.each([
  [
    'src/my-file.ts:2:10 - error TS2305: Module \'"./index"\' has no exported member \'missing\'.\n',
    '/my-workspace/my-package/src/my-file.ts:2:10 - error TS2305: Module \'"./index"\' has no exported member \'missing\'.\n',
  ],
  [
    'src/something.ts(19,15): error TS2551: Property \'getIdTokens\' does not exist on type \'User\'. Did you mean \'getIdToken\'?\n',
    '/my-workspace/my-package/src/something.ts(19,15): error TS2551: Property \'getIdTokens\' does not exist on type \'User\'. Did you mean \'getIdToken\'?\n',
  ],
  [
    'src/something.ts(19,36): error TS7006: Parameter \'error\' implicitly has an \'any\' type.\'\n',
    '/my-workspace/my-package/src/something.ts(19,36): error TS7006: Parameter \'error\' implicitly has an \'any\' type.\'\n',
  ],
  [
    'src/annoying file name (copy).ts(123,45): error TS1005: \',\' expected.\n',
    '/my-workspace/my-package/src/annoying file name (copy).ts(123,45): error TS1005: \',\' expected.\n',
  ],
  [
    'src/annoying file name (copy).ts:12:23 - error TS1005: \',\' expected.\n',
    '/my-workspace/my-package/src/annoying file name (copy).ts:12:23 - error TS1005: \',\' expected.\n',
  ],
  [
    '../other-package/file.ts:12:34 - error TS1005: \',\' expected.\n',
    '/my-workspace/other-package/file.ts:12:34 - error TS1005: \',\' expected.\n',
  ],
  [
    '../../other-workspace/other-package/file.ts:12:34 - error TS1005: \',\' expected.\n',
    '/other-workspace/other-package/file.ts:12:34 - error TS1005: \',\' expected.\n',
  ],
  [
    '../../other-workspace/../another-workspace/other-package/file.ts:12:34 - error TS1005: \',\' expected.\n',
    '/another-workspace/other-package/file.ts:12:34 - error TS1005: \',\' expected.\n',
  ],
  [
    'test_data/example.ts(3,1): error TS2588: Cannot assign to \'x\' because it is a constant.\n',
    '/my-workspace/my-package/test_data/example.ts(3,1): error TS2588: Cannot assign to \'x\' because it is a constant.\n',
  ],
  [
    'test_data/example.ts(5,7): error TS2322: Type \'number\' is not assignable to type \'string\'.\n',
    '/my-workspace/my-package/test_data/example.ts(5,7): error TS2322: Type \'number\' is not assignable to type \'string\'.\n',
  ],
  [
    'test_data/example.ts(6,19): error TS2551: Property \'loog\' does not exist on type \'Console\'. Did you mean \'log\'?\n',
    '/my-workspace/my-package/test_data/example.ts(6,19): error TS2551: Property \'loog\' does not exist on type \'Console\'. Did you mean \'log\'?\n',
  ],
  [
    'test_data/example.ts:3:1 - error TS2588: Cannot assign to \'x\' because it is a constant.\n',
    '/my-workspace/my-package/test_data/example.ts:3:1 - error TS2588: Cannot assign to \'x\' because it is a constant.\n',
  ],
  [
    '[96mtest_data/example.ts[0m:[93m3[0m:[93m1[0m - [91merror[0m[90m TS2588: [0mCannot assign to \'x\' because it is a constant.\n',
    '[96m/my-workspace/my-package/test_data/example.ts[0m:[93m3[0m:[93m1[0m - [91merror[0m[90m TS2588: [0mCannot assign to \'x\' because it is a constant.\n',
  ],
  noChange('2 import { missing } from \'./index\';\n'),
  noChange('           ~~~~~~~\n'),
  noChange('src/something.ts\n'),
  noChange('src/something.ts(1,2)\n'),
  noChange('src/something.ts:1:2\n'),
  noChange('  node_modules/typescript/lib/lib.dom.d.ts:17330:5\n'),

  // Windows line endings
  [
    'test_data/example.ts(3,1): error TS2588: Cannot assign to \'x\' because it is a constant.\r\n',
    '/my-workspace/my-package/test_data/example.ts(3,1): error TS2588: Cannot assign to \'x\' because it is a constant.\r\n',
  ],
  noChange('src/something.ts:1:2\r\n'),
])('maps line as expected: %s', (input, expectedOutput) => {
  expect(lineMapper(input)).toBe(expectedOutput);
});
