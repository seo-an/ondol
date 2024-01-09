# ondol
react without boilerplate

### 2023-01-03
##### 프로젝트 구조
ondol/<br>
├── ...<br>
├── public/<br>
│   ├── index.html<br>
│   ├── error.html<br>
│   ├── css/ 👩‍🚒 컴파일 된 css 파일<br>
│   └── fonts/ <br>
├── src/<br>
│   ├── assets/ 👩‍🚒 현재 사용하지 않음<br>
│   │   ├── icon/<br>
│   │   ├── image/<br>
│   ├── components/ 👩‍🚒 화면을 구성하는데에 필요한 컴포넌트들의 집합<br>
│   │   ├── component/ 👩‍🚒 화면을 구성하는 작은 단위의 컴포넌트: 기능 단위로 폴더에 담겨있음<br>
│   │   │   └── ...<br>
│   │   ├── layout/ 👩‍🚒 레이아웃에 관여하는 컴포넌트의 모음<br>
│   │   │   └── ...<br>
│   │   └── routes/ 👩‍🚒 App()에서 렌더링 하는 컴포넌트의 모음<br>
│   │       └── ...<br>
│   ├── data/ 👩‍🚒 정적 데이터<br>
│   ├── styles/ 👩‍🚒 스타일과 관련된 컴포넌트의 모음<br>
│   │   ├── common/ 🚒 공용 스타일<br>
│   │   └── custom/ 🚒 커스텀 스타일<br>
│   └── utils/ 👩‍🚒 공통적으로 사용되는 js 함수<br>
│   ├── App.tsx<br>
│   └── index.tsx<br>
├────── .env 👩‍🚒 환경변수 (git ignore)<br>
├────── database.js 👩‍🚒 데이터베이스 연결과 관련된 모듈<br>
├────── ecosystem.config.cjs 👩‍🚒 환경변수 (git ignore)<br>
├────── env.js 👩‍🚒 조건에 따라 환경변수를 불러옴<br>
├────── https-request.js 👩‍🚒 외부로 http 요청을 전달하는데 사용되는 모듈<br>
├────── package-lock.js<br>
├────── package.js<br>
├────── server.js<br>
├────── tsconfig.json 👩‍🚒 타입스크립트와 관련된 설정<br>
├────── webpack.common.config.js 👩‍🚒 웹팩 빌더 설정: 공유<br>
├────── webpack.dev.config.js 👩‍🚒 웹팩 빌더 설정: 개발환경<br>
└────── webpack.prod.config.js 👩‍🚒 웹팩 빌더 설정: 배포용<br>