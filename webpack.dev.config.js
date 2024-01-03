import { merge } from 'webpack-merge';
import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

import common from './webpack.common.config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default merge(common, {
  mode: 'development',

  devtool: 'source-map', // 소스맵 설정

  module: {
    rules: [
      {
        test: /\.s?[ca]ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      }
    ]
  },

  // 개발 서버 설정
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    port: 5500,
    hot: true, // HMR (Hot Module Replacement) 활성화
    historyApiFallback: true, // React 라우터를 위한 설정
    open: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // HMR 플러그인 추가
  ],
});

// HMR 추가 설정
// npm install react-hot-loader --save-dev
// 어플리케이션의 루트 컴포넌트를 hot 함수로 감싸줌
// export default hot(App);