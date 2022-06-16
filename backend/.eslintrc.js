module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'prefer-destructuring': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'new-cap': 0,
    'no-console': 0,
  },
};
