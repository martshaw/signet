module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.6.5'
      }
    ]
  ],

  plugins: ['@babel/plugin-proposal-private-methods']
};
