import { merge } from 'webpack-merge';
import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';


import common from './webpack.common.config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default merge(common, {
  mode: 'production',

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
    new CopyPlugin ({
      patterns: [
        {
          from: 'public/css',
          to: 'css'
        } // from 폴더 안의 내용이 to로 복사되어 들어가도록 한다.
      ]
    })
  ],

  // 출력 설정
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.min.js',
    publicPath: '/',
  }
});
