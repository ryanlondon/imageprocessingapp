const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
      { 
        test: /\.js$/,
        exclude: [/node_modules/, /woven_functions/],
        loader: "babel-loader",
      },
      {
        test: /\.svg$/, 
        use: { loader: 'file-loader', options: { name: '[name].[ext]' }},
      },
      // {
      //   test: /\.worker\.js$/,
      //   use: { loader: 'worker-loader', options: { inline: true, fallback: false } },
      // },
    ]
  },
  plugins: [
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'workers/serviceWorker.js'),
      filename: 'serviceWorker.js',
    }),
  ],
};
