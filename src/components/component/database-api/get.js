import { useState, useEffect, useCallback } from 'react';

const useGetFromDatabase = (url, parameter) => {
  const [data, setData] = useState(['nothing']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshIndex, setRefreshIndex] = useState(0); // 새로고침을 위한 상태

	const queryString = new URLSearchParams(parameter).toString();

  const getData = useCallback(async () => {
		setLoading(true);
    setError(null);
		try {
			const response = await fetch(`${url}?${queryString}`, {
				method: "GET",
			});

			if (!response.ok) {
				throw new Error('HTTP GET ERROR :: status ', response.status);
			}

			let result = await response.json();

			setData(result.data);
		} catch (error) {
			console.error('GET || CAN NOT TRY TO FETCH :: ', error);
			setError(error);
		} finally {
			setLoading(false);
		}
  }, [url, parameter, refreshIndex]);

  useEffect(() => {
    getData();
  }, []);


	// 새로고침
	const refreshData = () => {
    setRefreshIndex(prev => prev + 1);
  };

  return { data, loading, error, refreshData };
}

export default useGetFromDatabase;