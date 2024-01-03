import { useState } from 'react';

const useDeleteInDatabase = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

	const deleteData = async (data) => {
		setIsLoading(true);
		setError(null);

		if (!data) return;

		const id = data.id;
		const password = data.password;

		try {
			const response = await fetch(`${url}/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ password }),
			});

			if (!(response.ok) && response.status === 401) {
				alert('비밀번호가 다릅니다.');
			} else if (!(response.ok) && (response.status === 400 || response.status === 500)) {
				throw new Error('HTTP DELETE ERROR :: status ', response.status);
			} else if (response.ok) {
				alert('삭제되었습니다.');
				window.location.reload();
			}
		} catch (err) {
			console.error('CAN NOT TRY TO FETCH :: ', err);
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};
	
  return { deleteData, isLoading, error };
};

export default useDeleteInDatabase;
