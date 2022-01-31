module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    // 'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    // '@vue/standard'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': ['error', 'always'],
    'indent': 'off',
    'linebreak-style': 0,
    'func-call-spacing': 'off',
    'space-before-function-paren': ['error', 'never'],
    'vue/script-setup-uses-vars': 'warn',
    'vue/max-attributes-per-line': ['error', {
      'singleline': {
        'max': 3
      },
      'multiline': {
        'max': 1
      }
    }]
  }
};
