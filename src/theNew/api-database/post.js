import { useState } from 'react';

// 	const handleSubmit = async (e) => {
//     e.preventDefault();
		
// 		const inputName = getValue('name');
// 		const inputPassword = getValue('simple_password');
// 		const inputComment = getValue('comment');

// 		// console.log('wow', inputName, inputPassword, inputComment);

// 		if (inputName.length > 50) {
// 			return alert(`${inputName.length} 글자는 너무 길어서 이름으로 등록할 수 없어요. 50 글자 아래로 맞춰주세요.`);
// 		} else if (inputName.length === 0) {
// 			return alert(`이름을 입력해주세요.`);
// 		}

// 		if (inputPassword.length > 50) {
// 			return alert(`${inputPassword.length} 글자는 너무 길어서 패스워드로 등록할 수 없어요. 50 글자 아래로 맞춰주세요.`);
// 		} else if (inputPassword.length === 0) {
// 			return alert(`패스워드를 입력해주세요.`);
// 		}

// 		if (inputComment.length > 512) {
// 			return alert(`내용이 ${inputComment.length} 글자에요. 너무 길어서 등록할 수 없어요. 500 글자 아래로 맞춰주세요!`);
// 		} else if (inputComment.length === 0) {
// 			return alert(`내용을 입력해주세요.`);
// 		}

// 		const send = {
// 			'name': inputName,
// 			'simple_password': inputPassword,
// 			'comment': inputComment
// 		}

// 		postToDatabase(url, send);
// 		setTrigger(String(Math.random())+inputName);
// 	};

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
