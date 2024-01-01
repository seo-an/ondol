import { useState } from "react";
import Incheon from "./Incheon.js";

const allTabs = [
  {
    title: '인천공항 주차 정보',
    content: <Incheon />
  },
  {
    title: '김포공항 주차 정보',
    content: '준비중'
  },
];

const useTabs = (initialTab, allTabs) => {
  const [currIndex, setCurrIndex] = useState(initialTab);

  return {
    currentItem: allTabs[currIndex],
    changeItem: setCurrIndex
  };
}

const PublicApiSection = () => {
  const { currentItem, changeItem } = useTabs(0, allTabs);
  return (
    <div>
      <div>
				{allTabs.map((tab, index) => (
					<button key={index} onClick={() => changeItem(index)}>{tab.title}</button>
				))}
			</div>
      <div>{currentItem.content}</div>
    </div>
  );
}

export default PublicApiSection;
