import { merge } from 'webpack-merge';
import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// import CopyPlugin from 'copy-webpack-plugin';

import common from './webpack.common.config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default merge(common, {
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.s?[ca]ss$/,
        exclude: [/node_modules/],
        use: [
          // MiniCssExtractPlugin.loader,
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../' // 상대 경로 설정
            },
          },
          'css-loader',
          'sass-loader'
        ],
      },
    ]
  },

  // 플러그인 설정
  plugins: [
    new CleanWebpackPlugin(), // build 폴더의 이전 항목 제거
    new HtmlWebpackPlugin({
      hash: 'true',
      template: path.resolve(__dirname, 'public', 'index.html'),
      minify: {
        removeComments: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'error.html'),
      filename: 'error.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css', // CSS 파일의 출력 경로와 이름, 본문에 import 된 css 파일을 자동으로 압축함
    }),
    // new CopyPlugin ({
    //   patterns: [
    //     {
    //       from: 'public/fonts',
    //       to: 'fonts'
    //     } // from 폴더 안의 내용이 to로 복사되어 들어가도록 한다.
    //   ]
    // })
  ],

  
  optimization: {
    // 압축
    minimize: true,
    // 미니마이저
    minimizer: [
      // 플러그인 인스턴스 생성
      new CssMinimizerPlugin(),
    ],
  },

  // 출력 설정
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.min.js',
    publicPath: './',
  }
});
