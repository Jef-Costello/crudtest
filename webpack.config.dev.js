const path = require('path');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, 'web');
const APP_DIR = path.resolve(__dirname, 'client');
module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devtool: 'source-map',
  entry: [

    './client/crud.jsx',
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: 'http://localhost/api4/web/',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        loader: 'babel-loader',

        // Skip any files outside of your project's `src` directory

        include: path.join(__dirname, 'client'),

        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,


        // Options to configure babel with
        query: {

          presets: ['es2015'],
        },
      },
      {
        test: /\.styl$/,
        include: path.join(__dirname, 'client'),
        loader: 'style-loader!css-loader!stylus-loader',
      },
    ],
  },
};
