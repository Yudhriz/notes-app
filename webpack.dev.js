const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // Membantu debugging di dev mode
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: {
      paths: ['public/index.html', 'src/**/*'],
      options: {
        usePolling: true,
      },
    },
    open: true,
    port: 8080,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
