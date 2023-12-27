export default {
  // 진입점 설정
  entry: './src/index.tsx', // TypeScript 진입 파일

  // 모듈 해석 방법 정의
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  
  module: {
    rules: [
      {
        // Match `.js`, `.jsx`, `.ts` or `.tsx` files
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          target: 'esnext',
          minify: true
        }
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: 'style-loader' // CSS를 DOM에 주입
      //     },
      //     {
      //       loader: 'esbuild-loader',
      //       options: {
      //         loader: 'css', // esbuild의 CSS 로더 사용
      //         minify: true  // CSS 압축 활성화
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'style-loader', // 3. DOM에 스타일 삽입
      //     'css-loader',   // 2. CSS를 CommonJS로 변환
      //     'sass-loader'   // 1. Sass를 CSS로 컴파일
      //   ]
      // }
    ]
  }
};