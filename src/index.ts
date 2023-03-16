#!/usr/bin/env node

import spawnWrapped from 'process-wrapper';
import { lineMapper } from './lib';

const main = () => {
  spawnWrapped('tsc', {
    mapStdout: lineMapper,
  });
};

main();
