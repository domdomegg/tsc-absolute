#!/usr/bin/env node

// eslint-disable-next-line import/no-extraneous-dependencies
require('ts-node').register({
  projectSearchDir: __dirname,
  transpileOnly: true,
});

require('./index.ts');
