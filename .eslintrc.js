module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
  ],
  parser: 'babel-eslint',
  plugins: [
    'react',
    'react-hooks',
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
  },
};
