import { useRef } from "react";

import usePostToDatabase from "../api-database/put.js";

const GuestBookEdit = () => {
	const { postData, response, error, isLoading } = usePostToDatabase();
	
	const usernameBinding = useRef(null);
  const passwordBinding = useRef(null);
	const titleBinding = useRef(null);
	const contentBinding = useRef(null);

	const handleSubmit = (event) => {
		event.preventDefault();
    const inputData = {
      name: usernameBinding.current.value,
      simple_password: passwordBinding.current.value,
			title: titleBinding.current.value,
			comment: contentBinding.current.value
    };

		console.log('웅냥냐!!!', inputData);
	}

	return (
    <>
			<h1>글쓰기</h1>
				<div>
					<div>
						<div className="w50p">
							<form onSubmit={handleSubmit}>
								<div className="mgb10">
									<input ref={usernameBinding} type="text" id="name" placeholder="이름"></input>
									<input ref={passwordBinding} type="text" id="simple_password" placeholder="비밀번호"></input>
								</div>
								<div>
									<input ref={titleBinding} type="text" id="title" placeholder="제목"></input>
									<textarea ref={contentBinding} type="text" id="comment" placeholder="내용"></textarea>
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

export default GuestBookEdit;