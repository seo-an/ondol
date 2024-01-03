import { useState, useEffect, useCallback } from 'react';

// initialData : 전체 데이터
// render : 렌더링에 사용할 JSX
// per : 한 번에 표시할 데이터
const useInfiniteScroll = ( initialData, render, per = 3 ) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(() => {
    if (show * per >= initialData.length) {
      setHasMore(false);
      return;
    }
    setShow(show + 1);
  }, [show, initialData.length, per]);

  useEffect(() => {
    const newData = initialData.slice(0, show * per);
    setData(newData);
  }, [show, initialData]);

  const redered = data.map((item, index) => render(item, index));

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) {
        return;
      }
      loadMore();
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore, hasMore]);

  return { redered, hasMore };
}

export default useInfiniteScroll;
