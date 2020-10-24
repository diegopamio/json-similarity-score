module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:cypress/recommended',
    'airbnb',
  ],
  parser: '@babel/eslint-parser',
  plugins: [
    'react',
    'react-hooks',
    'cypress',
    'jest',
    '@babel',
  ],
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx'],
        map: [
          ['~', './'],
        ],
      },
    },
  },
  rules: {
    'max-len': ['error', { code: 120 }], // personal preference,to be worthy of seeing my code, you need a large monitor
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [0],
    indent: ['error', 2, { ignoredNodes: ['TemplateLiteral'] }], // babel-eslint error
    'template-curly-spacing': 'off', // babel-eslint error
    'arrow-parens': ['error', 'always'], // codeclimate has an old version of airnbnb-base
  },
};
