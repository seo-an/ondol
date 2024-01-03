import { useState } from 'react';

const usePostToDatabase = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const postData = async (url, data) => {
    // console.log('in postData::', url, data, JSON.stringify(data));

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('HTTP POST ERROR :: status ', response.status);
      } else {
        const result = await response.json();

        alert('방명록이 등록되었습니다. 신나요! 비밀번호를 반드시 기억해주세요 :)');
        
        setResponse(result);
      }
    } catch (error) {
      console.error('POST || CAN NOT TRY TO FETCH :: ', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { postData, response, error, isLoading };
};

export default usePostToDatabase;
