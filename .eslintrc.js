module.exports = {
  extends: '@mate-academy/eslint-config-react',
  rules: {
    "jsx-a11y/no-autofocus": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "object-curly-newline": [2, {
      "ObjectExpression": {
        "consistent": true,
        "minProperties": 4,
      },
    }],
  },
};
