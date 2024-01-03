import { useState, useEffect } from 'react';
import useInfiniteScroll from '../scrollInfinite.js';
import birds from '../../../data/Birds_20211124.json'
// no: 자료번호
// korean: 국명(원병오2000)
// area: 조사지역
// when: 관찰시기

const InfiniteScrollExample = () => {
  const [birdData, setBirdData] = useState([]);
	
  useEffect(() => {
    setBirdData(birds);
  }, []);

	const rendering = (item) => {
		return (
			<div key={item.no}>
				<p><span>{item.korean}</span> | <span>{item.area}</span> | <span>{item.when}</span></p>
			</div>
		);
	};

	const { redered, hasMore } = useInfiniteScroll(birdData, rendering, 10);

  return (
    <div>
      {redered}
      {!hasMore && <p>마지막 자료입니다.</p>}
    </div>
  );
};

export default InfiniteScrollExample;
