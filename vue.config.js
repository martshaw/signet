// https://cli.vuejs.org/config/

module.exports = {

  /*
   * The directory where the production build files will be generated in when
   * running
   */
  // outputDir: '../web-ej',
  outputDir: 'dist',

  /*
   * A directory (relative to outputDir) to nest generated static assets
   * (js, css, img, fonts).
   */
  assetsDir: './cms',

  /* Create source maps in prod */
  productionSourceMap: true,

  /*
   * Configure the crossorigin attribute on <link rel="stylesheet"> and <script>
   * tags in generated HTML
   */
  crossorigin: 'anonymous',

  pages: {
    l: {
      entry: 'src/main-list-page.ts',
      template: 'public/product-list-page.hbs',
      filename: 'product-list-page.html'
    }
  },

  lintOnSave: 'error',

  /*
   * Config for the dev server
   * You can find more information
   * here: https://webpack.js.org/configuration/dev-server/
   */
  devServer: {
    port: '8085',
    proxy: 'http://localhost:3023'
  },

  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()

      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
      .end()
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .end();
  }
};
