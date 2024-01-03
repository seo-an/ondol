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
      const response = await fetch(`/incheon-api/${url}?${queryString}`, {
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
        <div style={{ margin: '4em 0', textAlign: 'center' }}>
          <h1 style={{ margin: '1em 0' }}>인천공항 주차면적</h1>
          <button onClick={getData} style={{ backgroundColor: 'transparent', border: '1px solid #333', borderRadius: '2px' }}>새로고침</button>
        </div>
        {(data === 'nothing') ? <p>데이터가 없습니다.</p> :
          <>
            <div style={{ display: 'flex', marginBottom: '4em', flexWrap: 'wrap', justifyContent: 'center'}}>
              {data.map((item) => {
                return (
                  <div style={{ display: 'flex', width: '300px', margin: '1em 0', justifyContent: 'center' }}>
                    <div key={item.index}>
                      <div><p>{item.floor}</p></div>
                      <div>{item.parking} / {item.parkingarea}</div>
                      <div>총 주차 가능 면적의 {Math.floor((item.parking / item.parkingarea) * 100)}% 사용중</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>}
      </div>
    </>
  )
}

export default Incheon;