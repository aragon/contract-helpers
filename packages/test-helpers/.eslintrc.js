module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    browser: false,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'standard',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
    'prettier/standard',
  ],
  plugins: ['prettier', 'node', 'promise'],
  rules: {
    'node/no-missing-require': [
      'error',
      {
        allowModules: ['chai'],
      },
    ],
  },
  reportUnusedDisableDirectives: true,
}
