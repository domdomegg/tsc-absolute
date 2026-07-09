#!/usr/bin/env node

require('ts-node').register({
	projectSearchDir: __dirname,
	transpileOnly: true,
});

require('./index.ts');
