const webpack            = require('webpack');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');

const ROOT   = './app/src';
const PUBLIC = './app/dist';

module.exports = {
  entry: `${ROOT}/app`,
  output: {
    path: PUBLIC,
    filename: 'app.bundle.min.js',
  },
  plugins: [
    new CleanWebpackPlugin([PUBLIC]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: `${ROOT}/index.html`,
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new ExtractTextPlugin('app.bundle.min.css')
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel', 'webpack-strip?strip[]=debug,strip[]=console.log,strip[]=console.dir'],
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css', {publicPath: './'}),
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file?name=fonts/[name].[ext]'
    }, {
      test: /\.(jp(e)g|gif|png)?$/,
      loader: 'file?name=[name].[ext]'
    }]
  }
};