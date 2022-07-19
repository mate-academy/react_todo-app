module.exports = {
  extends: ['@mate-academy/eslint-config-react', 'plugin:cypress/recommended'],
  rules: {
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
      optionalDependencies: false,
      peerDependencies: false,
    }],
    'react/prop-types': 0,
    'max-len': ['error', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    'jsx-a11y/label-has-associated-control': ['error', {
      assert: 'either',
    }],
    'jsx-a11y/control-has-associated-label': 'off',
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".ts", ".js"] }],
    "import/extensions": [
       "error",
       "ignorePackages",
       {
         "js": "never",
         "jsx": "never",
         "ts": "never",
         "tsx": "never"
       }
    ],
    "jsx-a11y/label-has-associated-control": [ "error", {
      "required": {
        "some": [ "nesting", "id" ]
      }
    }],
    "jsx-a11y/label-has-for": [ "error", {
      "required": {
        "some": [ "nesting", "id" ]
      }
    }],
 },
};
