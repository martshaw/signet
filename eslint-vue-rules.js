module.exports = {
  'vue/attributes-order': 'warn',
  'vue/no-confusing-v-for-v-if': 'warn',
  'vue/no-v-html': 'warn',
  'vue/order-in-components': 'warn',
  'vue/this-in-template': 'warn',
  'vue/array-bracket-spacing': 'warn',
  'vue/arrow-spacing': 'warn',
  'vue/block-spacing': 'warn',
  'vue/brace-style': 'warn',
  'vue/comma-dangle': 'error',
  'vue/component-name-in-template-casing': [
    'error',
    'kebab-case'
  ],
  'vue/component-tags-order': [
    'error',
    {
      order: [
        [
          'template',
          'scripts'
        ],
        'style'
      ]
    }
  ],
  'vue/dot-location': 'error',
  'vue/max-len': 'error',
  'vue/no-boolean-default': 'error',
  'vue/no-deprecated-scope-attribute': 'error',
  'vue/no-deprecated-slot-attribute': 'error',
  'vue/no-deprecated-slot-scope-attribute': 'error',
  'vue/no-irregular-whitespace': 'warn',
  'vue/no-reserved-component-names': 'error',
  'vue/no-static-inline-styles': 'error',
  'vue/no-unsupported-features': 'error',
  'vue/object-curly-spacing': 'warn',
  'vue/padding-line-between-blocks': 'warn',
  'vue/require-direct-export': 'off',
  'vue/require-name-property': 'warn',
  'vue/script-indent': [
    'warn',
    2,
    {
      baseIndent: 1
    }
  ],
  'vue/space-infix-ops': 'warn',
  'vue/space-unary-ops': 'warn',
  'vue/v-on-function-call': 'warn',
  semi: [
    'error',
    'always'
  ],
  'vue/require-default-prop': 'off',
  'vue/html-self-closing': [
    'error',
    {
      html: {
        void: 'always',
        normal: 'always',
        component: 'any'
      },
      svg: 'always',
      math: 'always'
    }
  ],
  'vue/multiline-html-element-content-newline': [
    'error',
    {
      'ignoreWhenEmpty': true,
      'ignores': [],
      'allowEmptyLines': false
    }
  ]
};
