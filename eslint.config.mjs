import globals from 'globals';
import domdomegg from 'eslint-config-domdomegg';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
	{
		ignores: ['test_data/**'],
	},
	...domdomegg,
	{
		// CommonJS helper script (was covered by `env: node` under the v1 config)
		files: ['**/*.js'],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
];
