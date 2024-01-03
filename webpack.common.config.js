import path from 'path';
import { fileURLToPath } from 'url';

import CopyPlugin from 'copy-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  // 진입점 설정
  entry: './src/index.tsx', // TypeScript 진입 파일

  // 모듈 해석 방법 정의
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },

  performance: {
    maxAssetSize: 5242880, // 바이트 단위 (5MiB: 5 * 1,048,576 bytes)
    hints: 'warning' // 'error', 'warning', 또는 false 중 선택
  },
  
  module: {
    rules: [
      {
        // Match `.js`, `.jsx`, `.ts` or `.tsx` files
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx', // JSX 문법을 사용하는 TypeScript 파일 처리
          target: 'esnext', // 다른 빌더(ts)와 일치 시켜야 함
          minify: true // 코드 압축
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        include: path.resolve(__dirname, 'public/fonts'),
        generator: {
          filename: 'fonts/[name][ext]', // 폰트 파일 저장 위치 및 이름 설정
        },
      },
      {
        test: /\.(jpg|jpeg|gif|bmp|png|tiff|tif|ico|webp|heif|heic|raw|arw|cr2)$/,
        type: 'asset/resource',
        include: path.resolve(__dirname, 'src/assets/icon'),
        generator: {
          filename: 'media/icon/[name][ext]', // 이미지 저장 위치 및 이름 설정
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'] // svg를 컴포넌트로 사용가능하게 함
      },
    ]
  },

  // plugins: [
  //   new CopyPlugin ({
  //     patterns: [
  //       {
  //         from: 'public/fonts',
  //         to: 'fonts'
  //       } // from 폴더 안의 내용이 to로 복사되어 들어가도록 한다.
  //     ]
  //   })
  // ]
};