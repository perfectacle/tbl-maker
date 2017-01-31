const webpack            = require('webpack'),
      HtmlWebpackPlugin  = require('html-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      ExtractTextPlugin  = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app/src/app',
  output: {
    path: './app/dist',
    filename: 'app.bundle.min.js',
  },
  plugins: [
    new CleanWebpackPlugin(['app/dist']),
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
      template: './app/src/index.html',
      minify: {
        collapseInlineTagWhitespace: false,
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
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
      loader: ExtractTextPlugin.extract('style', 'css', {publicPath: '/'}),
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
  },
  devServer: {
    contentBase: './app/src',
    hot: true,
    inline: true
  }
};