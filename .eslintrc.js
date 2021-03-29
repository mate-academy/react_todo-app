module.exports = {
  extends: '@mate-academy/eslint-config-react-typescript',
  rules: {
    "jsx-a11y/no-autofocus": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "object-curly-newline": [2, {
      "ObjectExpression": {
        "consistent": true,
        "minProperties": 4,
      },
    }],
    'react/jsx-filename-extension': [2, {
      'extensions': ['.js', '.jsx', '.ts', '.tsx']
    }],
  },
};
