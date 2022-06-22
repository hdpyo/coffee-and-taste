const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        // 모든 .css 코드에 대해서 css-loader를 실행한다.
        test: /\.css$/, // .css 확장자를 가진 모든 파일
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          // 파일로더가 처리하는 파일을 모듈로 사용했을 때 경로 앞에 추가되는 문자열
          publicPath: './dist/',

          // 파일 로더가 output에 파일을 복사할 때 사용하는 형식.
          // [원본파일명].[확장자명][?캐시 무력화를 위한 쿼리스트링]
          name: '[name].[ext]?[hash]',

          // 용량을 설정하는데, url-loader 는 설정한 용량 미만의 파일들을 base64 인코딩한다.
          // 만약 설정한 용량보다 큰 파일들은 file-loader 가 동작하여 처리한다.
          limit: 20000, // 2KB 이상이라면? -> file-loader 가 동작한다.
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
  },
};
