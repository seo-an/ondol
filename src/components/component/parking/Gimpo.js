import { useState, useEffect } from 'react';

const useFetchData = () => {
//   const [data, setData] = useState(['nothing']);

// 	// GMP 김포국제공항
// 	// PUS 김해국제공항
// 	// CJU 제주국제공항
// 	// TAE 대구국제공항
// 	// KWJ 광주공항
// 	// RSU 여수공항
// 	// USN 울산공항
// 	// KUV 군산공항
// 	// WJU 원주공항
// 	// CJJ	청주국제공항
	
//   const params = {
// 		'schAirportCode': 'GMP',
// 		'serviceKey': `${process.env.REACT_APP_PUBLIC_DECODING_API_KEY}`,
// 		'numOfRows': '20',
// 		'pageNo': '1',
// 	}

//   const url = `service/rest/AirportParkingCongestion/airportParkingCongestionRT`;
// 	const queryString = new URLSearchParams(params).toString();

//   const getData = async () => {
//     try {
//       const response = await fetch(`/kac-api/${url}?${queryString}`, {
//         method: "GET",
//       }).then((res) => res.json());

//       if (!response) {
//         console.error('!! HTTP ERROR TO EXTERNAL API :: status ', response.status);
//       }

//       const result = response.response.body;

//       setData(result.items);
//     } catch (error) {
//       console.error('CAN NOT CONNECT TO EXTERNAL API :: ', error);
//     }
//   }

//   useEffect(() => {
//     getData();
//   }, []);

//   return { data, getData };
}


const Gimpo = () => {
  // const { data, getData } = useFetchData();

  return (
    <>
      <div>
        <div style={{ margin: '4em 0', textAlign: 'center' }}>
          <h1>김포공항 주차면적</h1>
          <h2>API 승인 대기중입니다 👷‍♀️</h2>
        </div>
        
        {/* {(data === 'nothing') ? <p>데이터가 없습니다.</p> :
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
        <button onClick={getData}>새로고침</button> */}
      </div>
    </>
  )
}

export default Gimpo;