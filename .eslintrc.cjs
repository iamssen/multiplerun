const ext = '{ts,tsx,mts,cts,js,jsx,mjs,cjs}';

module.exports = {
  extends: ['plugin:unicorn/recommended', 'react-app', 'prettier'],

  overrides: [
    {
      files: [`**/*.${ext}`],
      rules: {
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/no-negated-condition': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-useless-undefined': 'off',
        'unicorn/no-lonely-if': 'off',
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/prefer-type-error': 'off',

        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['warn'],
        '@typescript-eslint/consistent-type-imports': 'error'
      },
    },
  ],
};
