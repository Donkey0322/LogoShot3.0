module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'simple-import-sort'],
  rules: {
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // External packages
          ['^@?\\w'],

          // Constants
          ['env', 'AppConstants', '^.*/constants$'],

          // Type imports
          ['^.*\\u0000$'],

          // Internal packages inside `src` folder
          [
            '^(components|context|hooks|icons|layout|lib|modules|services|shared|theme|utils)(/.*|$)',
          ],

          // Side effect imports
          ['^\\u0000'],

          // Parent imports; put `..` last
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

          // Other relative imports; put same folder imports and `.` last
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

          // Style imports
          ['^.+\\.s?css$'],

          // Static assets
          ['^(static)(/.*|$)'],
        ],
      },
    ],
  },
};
