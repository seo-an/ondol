import { useState } from 'react';

const usePagination = (data, render, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  // 현재 페이지를 안전하게 설정하는 함수
  const setCurrentPageSafe = (pageNumber) => {
    const newPage = Math.max(1, Math.min(pageNumber, maxPage));
    setCurrentPage(newPage);
  };

  // 현재 페이지에 해당하는 데이터 부분 집합과 렌더링
  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end).map(render);
  };

  return { currentData, currentPage, setCurrentPage: setCurrentPageSafe, maxPage };
};

export default usePagination;
