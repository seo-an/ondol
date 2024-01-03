# ondol
react without boilerplate

### 2023-01-03
##### 프로젝트 구조
ondol/
├── ...
├── public/
│   ├── index.html
│   ├── error.html
│   ├── css/ 👩‍🚒 컴파일 된 css 파일
│   └── fonts/ 
├── src/
│   ├── assets/ 👩‍🚒 현재 사용하지 않음
│   │   ├── icon/
│   │   ├── image/
│   ├── components/ 👩‍🚒 화면을 구성하는데에 필요한 컴포넌트들의 집합
│   │   ├── component/ 👩‍🚒 화면을 구성하는 작은 단위의 컴포넌트: 기능 단위로 폴더에 담겨있음
│   │   │   └── ...
│   │   ├── layout/ 👩‍🚒 레이아웃에 관여하는 컴포넌트의 모음
│   │   │   └── ...
│   │   └── routes/ 👩‍🚒 App()에서 렌더링 하는 컴포넌트의 모음
│   │       └── ...
│   ├── data/ 👩‍🚒 정적 데이터
│   ├── styles/ 👩‍🚒 스타일과 관련된 컴포넌트의 모음
│   │   ├── common/ 🚒 공용 스타일
│   │   └── custom/ 🚒 커스텀 스타일
│   └── utils/ 👩‍🚒 공통적으로 사용되는 js 함수
│   ├── App.tsx
│   └── index.tsx
├────── .env 👩‍🚒 환경변수 (git ignore)
├────── database.js 👩‍🚒 데이터베이스 연결과 관련된 모듈
├────── ecosystem.config.cjs 👩‍🚒 환경변수 (git ignore)
├────── env.js 👩‍🚒 조건에 따라 환경변수를 불러옴
├────── https-request.js 👩‍🚒 외부로 http 요청을 전달하는데 사용되는 모듈
├────── package-lock.js
├────── package.js
├────── server.js
├────── tsconfig.json 👩‍🚒 타입스크립트와 관련된 설정
├────── webpack.common.config.js 👩‍🚒 웹팩 빌더 설정: 공유
├────── webpack.dev.config.js 👩‍🚒 웹팩 빌더 설정: 개발환경
└────── webpack.prod.config.js 👩‍🚒 웹팩 빌더 설정: 배포용