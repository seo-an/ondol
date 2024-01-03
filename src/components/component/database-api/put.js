import { useState } from 'react';

const usePutToDatabase = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const putData = async (url, data) => {
    setIsLoading(true);
    setError(null);

		const id = data.id;
		const modifiedData = {
			modifiedUsername: data.username,
			modifiedTitle: data.title,
			modifiedComment: data.comment
		};

		try {
			const response = await fetch(`${url}/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(modifiedData),
			});

				if (!response.ok) {
					throw new Error(`HTTP PUT ERROR :: status ${response.status}`);
				} else {
					const result = await response.json();

					alert('데이터가 성공적으로 업데이트되었습니다.');
					setResponse(result);
				}
			} catch (error) {
				console.error('PUT || CAN NOT TRY TO FETCH :: ', error);
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

  return { putData, response, error, isLoading };
};

export default usePutToDatabase;
