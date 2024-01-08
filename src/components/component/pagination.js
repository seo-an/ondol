import { useState } from 'react';

const usePagination = (data, dataRenderer, buttonRenderer, itemsPerPage = 10, pageRangeDisplayed = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  // 현재 페이지를 안전하게 설정하는 함수
  const setCurrentPageSafe = (pageNumber) => {
    const newPage = Math.max(1, Math.min(pageNumber, maxPage));
    setCurrentPage(newPage);
  };

  // 이전 또는 이후 페이지 그룹으로 이동
  const movePageGroup = (direction) => {
    if (direction === 'prev') {
      setCurrentPageSafe(Math.max(1, currentPage - pageRangeDisplayed));
    } else if (direction === 'next') {
      setCurrentPageSafe(Math.min(maxPage, currentPage + pageRangeDisplayed));
    }
  };

  // 현재 페이지 그룹의 시작과 끝 페이지를 계산
  const startPageOfGroup = () => {
    return Math.floor((currentPage - 1) / pageRangeDisplayed) * pageRangeDisplayed + 1;
  };
  const endPageOfGroup = () => {
    return Math.min(startPageOfGroup() + pageRangeDisplayed - 1, maxPage);
  };

  // 이전 그룹과 다음 그룹이 가능한지 여부 계산
  const isPrevGroupAvailable = startPageOfGroup() > 1;
  const isNextGroupAvailable = endPageOfGroup() < maxPage;

	  // 현재 페이지에 해당하는 데이터 부분 집합과 렌더링
	const renderData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end).map(dataRenderer);
  };

  // 페이지네이션 버튼을 렌더링하는 함수
  const renderButtons = () => {
    return buttonRenderer(currentPage, setCurrentPage, startPageOfGroup, endPageOfGroup, isPrevGroupAvailable, isNextGroupAvailable, movePageGroup);
  };

  return { 
    renderData, 
    renderButtons
  };
};

export default usePagination;

// 사용
// const { renderData, renderButtons } = usePagination(json 데이터, item 렌더링 jsx, button 렌더링 jsx, 페이지 당 아이템 수, 페이지네이션 아이템 수);

// jsx
{/* <div>
  {renderData()}
  {renderButtons()}
</div> */}