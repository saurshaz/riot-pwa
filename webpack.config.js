var webpack = require('webpack')
var path = require('path')
module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/app.js',
  output: {
    path: path.join(__dirname),
    filename: '[name].js',
    publicPath: '/'
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
      // new webpack.HotModuleReplacementPlugin(),
      // hot reload
      // new webpack.IgnorePlugin(/\.json$/),
      new webpack.DefinePlugin({
        __DEVELOPMENT__: false,
        __QA__: true,
        __DEVTOOLS__: false,
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      // new FlowStatusWebpackPlugin(),
       // hot reload
      new webpack.IgnorePlugin(/\.json$/),
      new webpack.optimize.CommonsChunkPlugin('main', 'main.js')
      // new webpack.optimize.UglifyJsPlugin()
     // new webpack.ProvidePlugin({
     //   riot: 'riot'
     // })
    ]
  }
}

