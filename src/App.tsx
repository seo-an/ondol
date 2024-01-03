import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout.js';
import Home from './components/routes/Home.js';
import OpenApiPage from './components/routes/OpenApiPage.js';
import RestApiPage from './components/routes/RestApiPage.js';
import About from './components/routes/About.js';

// import WindowPopup from './components/component/WindowPopup.js';

// import GuestBookWrite from './components/component/guestbook/GuestBookWrite.js';
// import GuestBookEdit from './components/component/guestbook/GuestBookEdit.js';
// import MyCalendar from './components/component/cards/calendar/MyCalendar.js';
// import ModalExample from './components/component/cards/modalExample.js';
// import LayerExample from './components/component/cards/layerPopupExample.js';
// import WindowPopExample from './components/component/cards/windowPopupExample.js';
// import InfiniteScrollExample from './components/component/cards/infiniteScrollExample.js';
// import PapagoTransExample from './components/component/cards/papagoExample.js';

// const OpenApiPage = lazy(() => import('./components/routes/OpenApiPage.js'));
// const RestApiPage = lazy(() => import('./components/routes/RestApiPage.js'));
// const About = lazy(() => import('./components/routes/About.js'));

const WindowPopup = React.lazy(() => import('./components/component/WindowPopup.js'));

const GuestBookWrite = React.lazy(() => import('./components/component/guestbook/GuestBookWrite.js'));
const GuestBookEdit = React.lazy(() => import('./components/component/guestbook/GuestBookEdit.js'));
const MyCalendar = React.lazy(() => import('./components/component/cards/calendar/MyCalendar.js'));
const ModalExample = React.lazy(() => import('./components/component/cards/modalExample.js'));
const LayerExample = React.lazy(() => import('./components/component/cards/layerPopupExample.js'));
const WindowPopExample = React.lazy(() => import('./components/component/cards/windowPopupExample.js'));
const InfiniteScrollExample = React.lazy(() => import('./components/component/cards/infiniteScrollExample.js'));
const PapagoTransExample = React.lazy(() => import('./components/component/cards/papagoExample.js'));


const App: React.FC = () => {

  return (
    <>
      <BrowserRouter basename="/">
        <Suspense fallback={<div><h1>로딩 중 🐰 <span className='fadeIn2s'>🥕</span> <span className='fadeIn5s'>🥕</span> <span className='fadeIn8s'>🥕</span></h1></div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* 상단 메뉴 */}
              <Route index element={<Home />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/handle-open-api" element={<OpenApiPage />}></Route>
              <Route path="/handle-rest-api" element={<RestApiPage />}></Route>
              <Route path="/about" element={<About />}></Route>
              
              {/* 그 외 라우팅 페이지 */}
              {/* 카드 메뉴 */}
              <Route path="/calendar" element={<MyCalendar />}></Route>
              <Route path="/modal-example" element={<ModalExample />}></Route>
              <Route path="/layer-example" element={<LayerExample />}></Route>
              <Route path="/windowpop-example" element={<WindowPopExample />}></Route>
              <Route path="/infinite-scroll-example" element={<InfiniteScrollExample />}></Route>
              <Route path="/papago-api" element={<PapagoTransExample />}></Route>
              {/* 방명록 */}
              <Route path="/guestbook/write" element={<GuestBookWrite />}></Route>
              <Route path="/guestbook/edit" element={<GuestBookEdit/>}></Route>
            </Route>

            {/* 윈도우 팝업 */}
            <Route path="/popup-view" element={<WindowPopup />}></Route>

            {/* 에러 */}
            <Route path="*" element={<div><h1 style={{textAlign: 'center'}}>👩‍🌾 죄송합니다. 페이지가 현재 작업중이네요! 🥕</h1></div>}></Route> 
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;