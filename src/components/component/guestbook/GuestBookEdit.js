import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetFromDatabase from "../database-api/get.js";
import useRedirectOnRefresh from "../redirectOnRefresh.js";
import usePutToDatabase from "../database-api/put.js";

const GuestBookEdit = () => {
	const { redirectOnRefresh } = useRedirectOnRefresh();
	redirectOnRefresh();

  const navigate = useNavigate();
	const navigateToPage = () => {
		navigate('/handle-rest-api');
	}

	const location = useLocation();
  const { id } = location.state || {};

	const url = '/api/guestbook/data';
  
  const cleaning = `DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') AS lastUpdatedAt`;
  const getQuery = {
    'select': `uniqueId, name, simple_password, title, comment, ${cleaning}`,
    'where': `uniqueId = '${id}'`
  };

  const { data } = useGetFromDatabase(url, getQuery); // get 요청

  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const [password, setPassword] = useState(''); // pw 검증


  useEffect(() => {
    if (data && data.length > 0) {
      const item = data[0];
      setUsername(item.name);
      setTitle(item.title);
      setComment(item.comment);
      setPassword(item.password);
    }
  }, [data]);
  
  const nameBinding = useRef(null);
  const titleBiding = useRef(null);
  const commentBinding = useRef(null);

  const { putData } = usePutToDatabase();

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const mu = nameBinding.current.value;
    const mt = titleBiding.current.value;
    const mc = commentBinding.current.value;

    if (mu === username && mt === title && mc === comment) {
      alert('수정사항이 없습니다.');
    }

    const putting = {
      id: id,
      username: mu,
      title: mt,
      comment: mc
    }

    putData(url, putting);
    setTimeout(navigateToPage, 1100);
  }

  return (
    <>
			<div style={{margin: '0 0 4em 0'}}>

				<div style={{margin: '4em 0', textAlign: 'center'}}>
					<h3>방명록 수정</h3>
				</div>
				<form onSubmit={handleEditSubmit}>
				<div style={{display: 'flex', width: '100%'}}>
					
					<div style={{ display: 'grid', width: '100%', gridTemplateColumns: '1fr 3fr 1fr', gridTemplateRows: 'repeat(4, auto)' }}>
						<div style={{ gridArea: '1 / 2' }}>
							<input defaultValue={username} ref={nameBinding} type="text" id="name" placeholder="이름" style={{ width: '100%', lineHeight: '2em', border: '0px' }}></input>
						</div>
						<div style={{ gridArea: '2 / 2' }}>
							<input defaultValue={title} ref={titleBiding} type="text" id="title" placeholder="제목" style={{ width: '100%', lineHeight: '2em', border: '0px' }}></input>
						</div>
						<div style={{ gridArea: '3 / 2', marginTop: '16px' }}>
							<textarea defaultValue={comment} ref={commentBinding} type="text" id="comment" placeholder="내용" style={{ width: 'calc(100% - 16px)', height: '284px', padding: '8px', overflow: 'auto', resize: 'none' }}></textarea>
						</div>
						<div style={{ gridArea: '4 / 2', display: 'flex', justifyContent: 'flex-end' }}>
							<button type="submit">등록</button>
						</div>
					</div>
					
				</div>
				</form>
			</div>
		</>
	);

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [title, setTitle] = useState('');
  // const [comment, setComment] = useState('');

  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     const item = data[0];
  //     setUsername(item.name);
  //     setPassword(item.simple_password);
  //     setTitle(item.title);
  //     setComment(item.comment);
  //   }
  // }, [data]);

	// return (
  //   <>
  //     <h1>글쓰기</h1>
  //     <div>
  //       <div className="w50p">
  //         {/* <form onSubmit={handleSubmit}> */}
	// 				<form>
  //           <div className="mgb10">
  //             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="name" placeholder="이름" />
  //             <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} id="simple_password" placeholder="비밀번호" />
  //           </div>
  //           <div>
  //             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="제목" />
  //             <textarea value={comment} onChange={(e) => setComment(e.target.value)} id="comment" placeholder="내용" />
  //           </div>
  //           <div className="mgt10">
  //             <button type="submit">등록</button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </>
  // );
}

export default GuestBookEdit;