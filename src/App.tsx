import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout.js';
import Home from './components/routes/Home.js';
import OpenApiPage from './components/routes/OpenApiPage.js';
import RestApiPage from './components/routes/RestApiPage.js';
import About from './components/routes/About.js';

import { CalendarView } from './components/CalendarView.js';
import { SvgImg } from './services/SvgImgJs.js';
import FlightApiJs from './services/FlightApiJs.js';
import { ModalExamplePageView } from './components/ModalExamplePageView.js';
import { WindowPopupExamplePageView } from './components/WindowPopupExamplePageView.js';
import { DateRangeExamplePageView } from './components/DateRangeExamplePageView.js';

import { PopupView } from './components/PopupView.js';

const App: React.FC = () => {

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>

          <Route path="/" element={<Layout />}>
            {/* 상단 메뉴 */}
            <Route index element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/handle-open-api" element={<OpenApiPage />}></Route>
            <Route path="/handle-rest-api" element={<RestApiPage />}></Route>
            <Route path="/about" element={<About />}></Route>
            {/* 카드 메뉴 */}
            <Route path="/calendar" element={<CalendarView />}></Route>
            <Route path="/svg-component" element={<SvgImg />}></Route>
            <Route path="/api-datas-go-kr" element={<FlightApiJs />}></Route>
            <Route path="/modal" element={<ModalExamplePageView />}></Route>
            <Route path="/window-popup" element={<WindowPopupExamplePageView />}></Route>
            {/* <Route path="/date-range-selection" element={<DateRangeExamplePageView />}></Route> */}
          </Route>

          {/* 그 외 라우팅 페이지 */}
          <Route path="/popup-view" element={<PopupView />}></Route>

          {/* 에러 및 테스트 */}
          <Route path="*" element={<h1>Error 404</h1>}></Route>
          {/* <Route path="/dev-test" element={<DevTestView />}></Route> */}
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import Greeting from './dev-test/test';

// const App: React.FC = () => {

//   return (
//     <>
//       <BrowserRouter basename="/">
//         <Routes>
//           <Route path="/">
//             <Route index element={<Greeting />}></Route>
//           </Route>
//           <Route path="*" element={<h1>Error 404</h1>}></Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   );

// };

// export default App;