// import { useState, useEffect, useCallback } from 'react';

// const useInfiniteScrollWithPagination = (data, render, itemsPerPage, maxInfiniteScrollPages) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const maxPage = Math.ceil(data.length / itemsPerPage);
//   const [isInfiniteScroll, setIsInfiniteScroll] = useState(true);

//   // 현재 페이지를 안전하게 설정하는 함수
//   const setCurrentPageSafe = useCallback((pageNumber) => {
//     const newPage = Math.max(1, Math.min(pageNumber, maxPage));
//     setCurrentPage(newPage);
//     // 페이지네이션 모드로 전환 조건 확인
//     setIsInfiniteScroll(newPage < maxInfiniteScrollPages);
//   }, [maxPage, maxInfiniteScrollPages]);

//   // 현재 페이지에 해당하는 데이터 부분 집합과 렌더링
//   const currentData = useCallback(() => {
//     const begin = (currentPage - 1) * itemsPerPage;
//     const end = isInfiniteScroll ? begin + (currentPage * itemsPerPage) : begin + itemsPerPage;
//     return data.slice(0, end).map(render);
//   }, [currentPage, data, itemsPerPage, render, isInfiniteScroll]);

//   // 스크롤 이벤트 핸들러
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!isInfiniteScroll || window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
//         return;
//       }
//       if (currentPage < maxInfiniteScrollPages) {
//         setCurrentPageSafe(currentPage + 1);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [currentPage, isInfiniteScroll, maxInfiniteScrollPages, setCurrentPageSafe]);

//   return { currentData, currentPage, setCurrentPage: setCurrentPageSafe, maxPage, isInfiniteScroll };
// };

// export default useInfiniteScrollWithPagination;





// 사용
// {/* 페이지네이션 + 무한스크롤 */}
// <div>
// {currentData()}
// {!isInfiniteScroll && (
// 	<div>
// 		{Array.from({ length: maxPage }, (_, i) => i + 1).map(pageNumber => (
// 			<button key={pageNumber} onClick={() => setCurrentPage(pageNumber)} disabled={currentPage === pageNumber}>
// 				{pageNumber}
// 			</button>
// 		))}
// 	</div>
// )}
// </div>