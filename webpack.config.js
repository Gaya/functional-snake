const env = process.argv.indexOf('--optimize-minimize') > -1 ? 'build' : 'dev';

module.exports = {
  entry: './src/main.js',
  output: {
    path: env === 'build' ? `${__dirname}/` : `${__dirname}/dist/`,
    publicPath: '/assets',
    filename: 'build.js',
  },
  devtool: env === 'build' ? null : 'source-map',
  resolve: {
    root: [
      `${__dirname}/src`,
      `${__dirname}/node_modules`,
    ],
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2'],
        },
      },
    ],
  },
};
