const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'src', 'www', 'dist'),
    filename: 'main.js',
    publicPath: 'dist'
  },
  module: {
    preLoaders: [{
      test: /\.js|\.html$/,
      exclude: /node_modules/,
      loader: 'riotjs-loader'
    }],
    loaders: [{
      test: /\.js|\.html$/,
      exclude: /node_modules/,
      loader: 'riotjs-loader'
    }, {
      test: /\.js|\.html$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader!cssnext-loader'
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url'
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff'
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    },
    {
      include: /\.json$/,
      loaders: ['json-loader']
    }],
    plugins: [
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.IgnorePlugin(/\.json$/),
      new webpack.optimize.UglifyJsPlugin({
        test: /\.js|\.html$/,
        compress: true,
        comments: /NO_LICENSE/
      }),
      new webpack.optimize.CommonsChunkPlugin('main', 'main.js')
     // new webpack.ProvidePlugin({
     //   riot: 'riot'
     // })
    ]
  }
}

