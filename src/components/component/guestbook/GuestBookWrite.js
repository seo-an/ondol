import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import usePostToDatabase from "../database-api/post.js";
import useFormSubmitValidation from "../formValidation.js";

const GuestBookWrite = () => {
	const { postData } = usePostToDatabase();
	
	const validationRules = {
    username: [
      { validate: (value) => value.length !== 0, message: '이름을 입력해주세요.' }
    ],
    simple_password: [
      { validate: (value) => value.length !== 0, message: '패스워드를 입력해주세요.' }
    ],
		title: [
      { validate: (value) => value.length !== 0, message: '제목을 입력해주세요.' }
    ],
		comment: [
      { validate: (value) => value.length !== 0, message: '내용이 비어있습니다.' }
    ]
  };

	const navigate = useNavigate();
	const navigateToPage = () => {
		navigate('/handle-rest-api');
	}

  const { elements, validatedState, handleSubmit } = useFormSubmitValidation(validationRules);

	useEffect(() => {
		if (validatedState) {
			const url = '/api/guestbook/data';
			const inputData = {
				name: elements.username.current.value,
				simple_password: elements.simple_password.current.value,
				title: elements.title.current.value,
				comment: elements.comment.current.value,
				isPublic: true
			};
	
			postData(url, inputData);
			setTimeout(navigateToPage, 1500);
		}
	}, [validatedState]);
	

	return (
    <>
			<div style={{margin: '0 0 4em 0'}}>

				<div style={{margin: '4em 0', textAlign: 'center'}}>
					<h3>방명록 작성</h3>
				</div>
				<form onSubmit={handleSubmit}>
				<div style={{display: 'flex', width: '100%'}}>
					
					<div style={{ display: 'grid', width: '100%', gridTemplateColumns: '1fr 3fr 1fr', gridTemplateRows: 'repeat(5, auto)' }}>
						<div style={{ gridArea: '1 / 2' }}>
							<input ref={elements.username} type="text" id="name" placeholder="이름" style={{ width: '100%', lineHeight: '2em', border: '0px' }}></input>
						</div>
						<div style={{ gridArea: '2 / 2' }}>
							<input ref={elements.simple_password} type="text" id="simple_password" placeholder="비밀번호" style={{ width: '100%', lineHeight: '2em', border: '0px' }}></input>
						</div>
						<div style={{ gridArea: '3 / 2' }}>
							<input ref={elements.title} type="text" id="title" placeholder="제목" style={{ width: '100%', lineHeight: '2em', border: '0px' }}></input>
						</div>
						<div style={{ gridArea: '4 / 2', marginTop: '16px' }}>
							<textarea ref={elements.comment} type="text" id="comment" placeholder="내용" style={{ width: 'calc(100% - 16px)', height: '284px', padding: '8px', overflow: 'auto', resize: 'none' }}></textarea>
						</div>
						<div style={{ gridArea: '5 / 2', display: 'flex', justifyContent: 'flex-end' }}>
							<button type="submit">등록</button>
						</div>
					</div>
					
				</div>
				</form>
			</div>
		</>
	);
}

export default GuestBookWrite;