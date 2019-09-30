module.exports = {
  extends: ['airbnb', '@mate-academy/eslint-config'],
  env: {
    es6: true,
    browser: true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'no-console': 'off',
    "no-param-reassign": 0,

    "no-shadow": ["error", { "builtinGlobals": false }],
    "react/destructuring-assignment": 0,
    "import/prefer-default-export": 0,
  }
};
