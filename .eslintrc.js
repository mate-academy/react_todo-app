module.exports = {
  extends: '@mate-academy/eslint-config-react',
  rules: {
    "jsx-a11y/label-has-associated-control": [2, { assert: "either" }],
    "jsx-a11y/no-autofocus": 'off',
  }
};
