import { merge } from 'webpack-merge';
import path from 'path';
import { fileURLToPath } from 'url';

import common from './webpack.common.config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default merge(common, {
  mode: 'development',

  devtool: 'inline-source-map', // 소스맵 설정

  // 개발 서버 설정
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    port: 8573,
    historyApiFallback: true, // React 라우터를 위한 설정
    hot: true,
    open: true,
  }
});
