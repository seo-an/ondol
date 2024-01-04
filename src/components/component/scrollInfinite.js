import { useState, useEffect, useCallback } from 'react';

// initialData : 전체 데이터
// render : 렌더링에 사용할 JSX
// per : 한 번에 표시할 데이터
const useInfiniteScroll = ( initialData, render, per = 3 ) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(() => {
    if (initialData.length === 0) return;
    if (show * per >= initialData.length) {
      setHasMore(false);
      return;
    }

    setHasMore(true);
    setShow(show + 1);
  }, [show, initialData.length, per]);

  useEffect(() => {
    const newData = initialData.slice(0, show * per);
    setData(newData);
  }, [show, initialData]);

  const redered = data.map((item, index) => render(item, index));

  useEffect(() => {
    if (document.documentElement.scrollHeight === document.documentElement.clientHeight && hasMore) {
      loadMore();
    }

    const handleScroll = () => {
      // if (!hasMore || (window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight) {
      //   return;
      // }

      if (!hasMore || ((window.innerHeight + document.documentElement.scrollTop) <= document.documentElement.offsetHeight - 200)) {
        return;
      }
      
      loadMore();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    }
  }, [loadMore, hasMore]);

  return { redered, hasMore };
}

export default useInfiniteScroll;