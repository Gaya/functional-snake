module.exports = {
  entry: './src/main.js',
  output: {
    path: `${__dirname}/dist/`,
    publicPath: '/assets',
    filename: 'build.js',
  },
  devtool: 'source-map',
  resolve: {
    root: [
      `${__dirname}/src`,
      `${__dirname}/node_modules`,             // npm
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
