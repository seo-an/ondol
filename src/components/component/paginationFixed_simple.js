import { useState } from 'react';

const useSimpleFixedPagination = (totalItems, initialItemsPerPage, itemRenderer) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const totalPages = Math.ceil(totalItems.length / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  const prevPage = () => {
    goToPage(currentPage - 1);
  };

  const changeItemsPerPage = (event) => {
    setItemsPerPage(Number(event.target.value));
    goToPage(1); // Reset to first page after changing item count
  };

  const paginationControlPannel = (
    <div>
      <button onClick={() => goToPage(1)}>처음</button>
      <button onClick={prevPage}>이전</button>
      <input type="number" value={currentPage} onChange={(e) => goToPage(Number(e.target.value))} />
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems.length);
  const itemsToRender = totalItems.slice(startIndex, endIndex).map(item => itemRenderer(item));

  return { currentPage, totalPages, paginationControlPannel, itemsToRender };
};

export default useSimpleFixedPagination;

// 사용
// const { paginationControlPannel, itemsToRender, changeItemsPerPage } = usePaginationInputNum(json 포맷 데이터, 페이지 당 아이템 수, 아이템 렌더링 jsx);?

// jsx
{/* <div>
		{itemsToRender}
		{paginationControlPannel}
	</div> */}