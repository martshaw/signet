module.exports = {
  root: false,

  extends: [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    '@vue/standard',
    '@vue/typescript'
  ],

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  rules: require('../eslint-vue-rules'),
  ignorePatterns: ['src/assets/scripts/regexPatterns.js'],

  overrides: [
    {
      files: [
        '**/tests/unit/**/*.spec.js',
        '**/tests/unit/**/*.spec.ts'
      ],
      env: {
        jest: true
      },
      rules: {
        'max-len': 'off',
        'vue/max-len': 'off'
      }
    },
    {
      files: ['*.vue'],
      rules: {
        'no-tabs': 'off',
        indent: 'off'
      }
    },
    {
      files: [
        './copyFilesToWebApp.js',
        './buildWebComponents.js'
      ],
      env: {
        node: true,
        browser: false
      },
      rules: {
        'no-console': 'off'
      }
    }
  ]
};
