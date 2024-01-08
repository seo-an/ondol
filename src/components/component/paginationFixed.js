import React, { useState, useMemo, useCallback } from 'react';

const useFixedPagination = (initialData, itemRenderer, initialItemsPerPage = 10) => {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(initialData.length / itemsPerPage);

  const chunk = useMemo(() => {
    return initialData.reduce((accumulator, currentValue, currentIndex) => {
      const chunkIndex = Math.floor(currentIndex / itemsPerPage);
      accumulator[chunkIndex] = accumulator[chunkIndex] || [];
      accumulator[chunkIndex].push(currentValue);
      return accumulator;
    }, []);
  }, [initialData]);

  // 페이지 이동 함수
  const goToPage = useCallback((pageNum) => {
    setCurrentPage(Math.min(Math.max(1, pageNum), totalPages));
  }, [totalPages]);

  // 이전 페이지로 이동
  const prevPage = useCallback(() => {
    setCurrentPage(current => Math.max(1, current - 1));
  }, []);

  // 다음 페이지로 이동
  const nextPage = useCallback(() => {
    setCurrentPage(current => Math.min(current + 1, totalPages));
  }, [totalPages]);

  // 페이지당 항목 수 변경
  const changeItemsPerPage = useCallback((event) => {
    setItemsPerPage(Number(event.target.value));
  }, []);


  const paginationControlPannels = (
    <div>
      <button onClick={() => goToPage(1)}>처음</button>
      <button onClick={prevPage}>이전</button>
      <input type="text" value={currentPage} onChange={(e) => goToPage(Number(e.target.value))} />
      <span> / {totalPages} 페이지</span>
      <button onClick={nextPage}>다음</button>
      <button onClick={() => goToPage(totalPages)}>마지막</button>
      <select onChange={changeItemsPerPage} value={itemsPerPage}>
        <option value={5}>5개씩 보기</option>
        <option value={10}>10개씩 보기</option>
        {/* 추가 옵션 가능 */}
      </select>
    </div>
  );

  const itemsToRender = useMemo(() => {
    const pageIndex = currentPage - 1;
    // 안전하게 배열을 추출하고, 배열이 아니면 빈 배열 반환
    const currentPageData = Array.isArray(chunk[pageIndex]) ? chunk[pageIndex] : [];
    return currentPageData.map(item => itemRenderer(item));
  }, [currentPage, chunk, itemRenderer]);

  return { chunk, itemsToRender, paginationControlPannels };
};

export default useFixedPagination;

// 사용
// const { paginationControls, itemsToRender, changeItemsPerPage } = usePaginationInputNum(json 포맷 데이터, 페이지 당 아이템 수, 아이템 렌더링 jsx);?

// jsx
{/* <div>
		{itemsToRender}
		{paginationControls}
	</div> */}