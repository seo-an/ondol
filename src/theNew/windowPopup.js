import { useState } from 'react';

const useWindowPopup = () => {
  const [windowPopup, setWindowPopup] = useState(null);

  const openPopup = (url, name, options) => {
    const popup = window.open(url, name, options);
    setWindowPopup(popup);
  };

  // 부모 컴포넌트가 관리할 필요가 있을 때
  // const closePopup = () => {
  //   if (windowPopup && !windowPopup.closed) {
  //     windowPopup.close();
  //   }
  // };

  // return { openPopup, closePopup };
  return { openPopup };
};

export default useWindowPopup;
