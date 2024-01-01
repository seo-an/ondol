import { useState, useEffect } from 'react';

const useGetFromDatabase = (url, parameter) => {
  const [data, setData] = useState(['nothing']);

	const queryString = new URLSearchParams(parameter).toString();

  const getData = async () => {
		try {
			const response = await fetch(`${url}?${queryString}`, {
				method: "GET",
			});

			if (!response.ok) {
				throw new Error('HTTP GET ERROR :: status ', response.status);
			}

			let result = await response.json();

			// if (result.data.length === 0) {
			// 	// database에 자료가 하나도 없을 때 예외처리
			// 	return result = 'nothing';
			// } else {
			// 	// 최종
			// 	return result.data;
			// }

			setData(result.data);

		} catch (error) {
			console.error('CAN NOT TRY TO FETCH :: ', error);
		}
  }

  useEffect(() => {
    getData();
  }, []);

  return { data };
}

export default useGetFromDatabase;