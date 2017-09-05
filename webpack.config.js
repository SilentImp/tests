const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

const baseDir = process.cwd();
const nodeModulesPath = resolve(baseDir, 'node_modules');

module.exports = {
  context: resolve(__dirname, './source'),
  entry: [
    'babel-polyfill',
    'app.jsx',
  ],
  output: {
    path: resolve(__dirname, './build/javascript/'),
    publicPath: '/javascript/',
    filename: 'build-[hash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less'],
    modules: [
      resolve(baseDir, ''),
      resolve(baseDir, './source'),
      resolve(baseDir, './source/pages'),
      nodeModulesPath,
    ],
  },
  // externals: {
  //   cheerio: 'window',
  //   'react/addons': true,
  //   'react/lib/ExecutionEnvironment': true,
  //   'react/lib/ReactContext': true,
  // },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: [nodeModulesPath],
        use: ['babel-loader'],
      }, {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              url: false,
              root: '/',
              modules: false,
              sourceMap: true,
            },
          },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'pages/index.pug',
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    }),
  ],
};
