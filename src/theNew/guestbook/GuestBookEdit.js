import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useGetFromDatabase from "../api-database/get.js";
import useRedirectOnRefresh from "../redirectOnRefresh.js";

const GuestBookEdit = () => {
	const { redirectOnRefresh } = useRedirectOnRefresh();
	redirectOnRefresh();

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
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (data && data.length > 0) {
      const item = data[0];
      setUsername(item.name);
      setPassword(item.simple_password);
      setTitle(item.title);
      setComment(item.comment);
    }
  }, [data]);

	return (
    <>
      <h1>글쓰기</h1>
      <div>
        <div className="w50p">
          {/* <form onSubmit={handleSubmit}> */}
					<form>
            <div className="mgb10">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="name" placeholder="이름" />
              <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} id="simple_password" placeholder="비밀번호" />
            </div>
            <div>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="제목" />
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} id="comment" placeholder="내용" />
            </div>
            <div className="mgt10">
              <button type="submit">등록</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default GuestBookEdit;