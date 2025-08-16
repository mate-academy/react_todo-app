// eslint.config.js
import eslintPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPlugin,
    },
    rules: {
      '@typescript-eslint/indent': 'off', // вимикаємо правило, яке викликає Maximum call stack
      // сюди додай інші правила з твого .eslintrc
    },
    ignores: ['node_modules/**', 'dist/**', 'build/**'], // замість .eslintignore
  },
];