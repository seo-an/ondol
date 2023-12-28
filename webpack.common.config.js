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
          target: 'esnext', // 다른 빌더(ts)와 일치 시켜야 함
          minify: true // 코드 압축
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash][ext]', // 폰트 파일 저장 위치 및 이름 설정
        },
      },
      {
        test: /\.(jpg|jpeg|gif|bmp|png|tiff|tif|ico|svg|webp|heif|heic|raw|arw|cr2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'media/image/[name].[contenthash][ext]', // 이미지 저장 위치 및 이름 설정
        },
      }
    ]
  }
};