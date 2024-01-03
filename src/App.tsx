import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout.js';
import Home from './components/routes/Home.js';
import OpenApiPage from './components/routes/OpenApiPage.js';
import RestApiPage from './components/routes/RestApiPage.js';
import About from './components/routes/About.js';

import WindowPopup from './components/component/WindowPopup.js';

import GuestBookWrite from './components/component/guestbook/GuestBookWrite.js';
import GuestBookEdit from './components/component/guestbook/GuestBookEdit.js';
import MyCalendar from './components/component/cards/calendar/MyCalendar.js';
import ModalExample from './components/component/cards/modalExample.js';
import LayerExample from './components/component/cards/layerPopupExample.js';
import WindowPopExample from './components/component/cards/windowPopupExample.js';
import InfiniteScrollExample from './components/component/cards/infiniteScrollExample.js';
import PapagoTransExample from './components/component/cards/papagoExample.js';

const App: React.FC = () => {

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>

          <Route path="/" element={<Layout />}>
            {/* 상단 메뉴 */}
            <Route index element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            {/* 카드 메뉴 */}
            <Route path="/calendar" element={<MyCalendar />}></Route>
            <Route path="/modal-example" element={<ModalExample />}></Route>
            <Route path="/layer-example" element={<LayerExample />}></Route>
            <Route path="/windowpop-example" element={<WindowPopExample />}></Route>
            <Route path="/infinite-scroll-example" element={<InfiniteScrollExample />}></Route>
            <Route path="/papago-api" element={<PapagoTransExample />}></Route>

            <Route path="/handle-open-api" element={<OpenApiPage />}></Route>

            <Route path="/handle-rest-api" element={<RestApiPage />}></Route>
            <Route path="/guestbook/write" element={<GuestBookWrite />}></Route>
            <Route path="/guestbook/edit" element={<GuestBookEdit/>}></Route>

            <Route path="/about" element={<About />}></Route>
          </Route>

          {/* 그 외 라우팅 페이지 */}
          <Route path="/popup-view" element={<WindowPopup />}></Route>

          {/* 에러 및 테스트 */}
          <Route path="*" element={<h1>Error 404</h1>}></Route>
          {/* <Route path="/dev-test" element={<DevTestView />}></Route> */}
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;