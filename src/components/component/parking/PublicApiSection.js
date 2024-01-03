import { useState } from "react";
import Incheon from "./Incheon.js";
import Gimpo from "./Gimpo.js";

const allTabs = [
  {
    title: '인천공항 주차 정보',
    content: () => <Incheon />
  },
  {
    title: '김포공항 주차 정보',
    content: () => <Gimpo />
  },
];

const useTabs = (initialTab, allTabs) => {
  const [currIndex, setCurrIndex] = useState(initialTab);

  return {
    currentItem: allTabs[currIndex],
    changeItem: setCurrIndex, 
    currIndex
  };
}

const PublicApiSection = () => {
  const { currentItem, changeItem, currIndex } = useTabs(0, allTabs);
  return (
    <div>
      <div style={{ display: 'flex' }}>
        {allTabs.map((tab, index) => (
          <button key={index} onClick={() => changeItem(index)} style={{ padding: '16px', fontSize: '1.2em', backgroundColor: 'transparent', border: '0px', cursor: 'pointer', color: currIndex === index ? 'black' : '#c1c1c1' }}>{tab.title}</button>
        ))}
      </div>

      <div style={{ padding: '16px' }}>
        {currentItem.content()} {/* 컴포넌트를 렌더링하는 함수 호출 */}
      </div>
    </div>
  );
}

export default PublicApiSection;
