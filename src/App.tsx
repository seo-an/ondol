import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import Layout from './client/view/layout/Layout.js';
// import Home from './client/view/routes/Home.js';
// import OpenApiPage from './client/view/routes/OpenApiPage.js';
// import RestApiPage from './client/view/routes/RestApiPage.js';
// import About from './client/view/routes/About.js';
// import { DevTestView } from './_dev_test/DevTestView.js';

// import { CalendarReactJsPowered } from './client/components/component/CalendarReactJsPowered.js';
// import { CalendarView } from './client/view/pages/CalendarView.js';
// import { SvgImg } from './client/components/component/SvgImgJs.js';
// import { FlightApiJs } from './client/components/component/FlightApiJs.js';
// import { ModalExamplePageView } from './client/view/pages/ModalExamplePageView.js';
// import { WindowPopupExamplePageView } from './client/view/pages/WindowPopupExamplePageView.js';
// import { DateRangeExamplePageView } from './client/view/pages/DateRangeExamplePageView.js';

// import { PopupView } from './client/view/pages/PopupView.js';
import Greeting from './dev-test/test';

const App: React.FC = () => {

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/">
            <Route index element={<Greeting />}></Route>
          </Route>
          <Route path="*" element={<h1>Error 404</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );


  // return (
  //   <>
  //     <h1>hello, ts!</h1>
  //     <h3>제발 나와라아~~~~</h3>
  //   </>
  // );
};

export default App;