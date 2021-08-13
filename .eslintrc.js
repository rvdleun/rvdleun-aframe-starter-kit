module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
    'prettier'
  ],
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'rules': {
    'max-len': [2, { code: 120, ignorePattern: '^import .*' }],
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off'
  },
};
