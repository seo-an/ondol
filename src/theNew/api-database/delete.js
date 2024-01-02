import { useState } from 'react';

const useDeleteInDatabase = (url) => {
	// const [trigger, setTrigger] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

	const deleteData = async (item) => {
		setIsLoading(true);
		setError(null);

		console.log('inininininininin', item);
		if (!item) return;

		const id = item.id;
		const password = item.password;

		// 정상작동 --------------------------------------------
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
		// ---------------------------------------------------

	};

		

  return { deleteData, isLoading, error };
};

export default useDeleteInDatabase;
