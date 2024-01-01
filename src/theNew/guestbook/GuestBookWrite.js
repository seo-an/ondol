import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import usePostToDatabase from "../api-database/post.js";
import useFormSubmitValidation from "../formValidation.js";

const GuestBookWrite = () => {
	const { postData, response, error, isLoading } = usePostToDatabase();
	
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
			navigateToPage();
		}
	}, [validatedState]);
	

	return (
    <>
			<h1>글쓰기</h1>
				<div>
					<div>
						<div className="w50p">
							<form onSubmit={handleSubmit}>
								<div className="mgb10">
									<input ref={elements.username} type="text" id="name" placeholder="이름"></input>
									<input ref={elements.simple_password} type="text" id="simple_password" placeholder="비밀번호"></input>
								</div>
								<div>
									<input ref={elements.title} type="text" id="title" placeholder="제목"></input>
									<textarea ref={elements.comment} type="text" id="comment" placeholder="내용"></textarea>
								</div>
								<div className="mgt10">
									<button type="submit">등록</button>
								</div>
							</form>
						</div>
					</div>
				</div>
		</>
	);
}

export default GuestBookWrite;