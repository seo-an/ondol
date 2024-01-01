import { useState, useEffect } from 'react';

const useFetchData = () => {
  const [data, setData] = useState(['nothing']);

  const params = {
		'serviceKey': `${process.env.REACT_APP_PUBLIC_DECODING_API_KEY}`,
		'numOfRows': '20',
		'pageNo': '1',
		'type': 'json'
	}

  const url = `B551177/StatusOfParking/getTrackingParking`;
	const queryString = new URLSearchParams(params).toString();

  const getData = async () => {
    try {
      const response = await fetch(`/flight-api/${url}?${queryString}`, {
        method: "GET",
      }).then((res) => res.json());

      if (!response) {
        console.error('!! HTTP ERROR TO EXTERNAL API :: status ', response.status);
      }

      const result = response.response.body;

      setData(result.items);
    } catch (error) {
      console.error('CAN NOT CONNECT TO EXTERNAL API :: ', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return { data };
}


const Incheon = () => {
  const { data, getData } = useFetchData();

  return (
    <>
      <div>
        <h1>주차면적</h1>
        {(data === 'nothing') ? <p>데이터가 없습니다.</p> :
          <>
            {data.map((item) => {
              return (
                <div key={item.index}>
                  <div><p>{item.floor}</p></div>
                  <div>{item.parking} / {item.parkingarea}</div>
                  <div>총 주차 가능 면적의 {Math.floor((item.parking / item.parkingarea) * 100)}% 사용중</div>
                </div>
              );
            })}
          </>}
        <button onClick={getData}>새로고침</button>
      </div>
    </>
  )
}

export default Incheon;