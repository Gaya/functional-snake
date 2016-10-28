module.exports = {
  entry: './src/main.js',
  output: {
    path: `${__dirname}/dist/`,
    publicPath: '/assets',
    filename: 'build.js',
  },
  devtool: 'source-map',
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
