import { useNavigate } from "react-router-dom";
import useGetFromDatabase from "./api-database/get.js";
import useScrollLoadingData from "./scrolling.js";


const GuestBook = () => {
  const url = '/api/guestbook/data';
  
  const cleaning = `DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') AS lastUpdatedAt`;
  const getQuery = {
    'select': `uniqueId, name, simple_password, comment, ${cleaning}`,
    'where': ``
  };

  const redering = (item, index) => {
    return (
      <div key={index} style={{ display: 'flex', flexWrap: 'nowrap' }}>
        <div style={{ display: 'flex', width: '16px', minHeight: '280px', margin: '16px 0px 16px 16px', backgroundColor: '#d6d6d6' }}></div>
        <div style={{ display: 'flex', width: '520px', minHeight: '280px', margin: '16px 16px 16px 0px', padding: '8px', border: '1px solid #d6d6d6', alignContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', width: '100%', height: 'fit-content', justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
            <div>{item.lastUpdatedAt}</div>
            <div style={{ marginLeft: '8px' }}><button>수정</button></div>
          </div>
          <div style={{ display: 'flex', width: '100%', height: 'calc(100% - 24px)', alignContent: 'space-between', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', width: '100%' }}>방명록</div>
              <div style={{ display: 'flex', width: '100%' }}>{item.comment}</div>
            </div>
            <div style={{ display: 'flex', marginRight: '16px' }}>{item.name}</div>
          </div>
        </div>
      </div>
    );
  };

  const { data } = useGetFromDatabase(url, getQuery);
  const { redered, hasMore } = useScrollLoadingData(data, redering, 2);

  const navigate = useNavigate();

  function navigateToPage() {
    navigate('/write');
  }
  
  return (
    <>
      <h1>안녕안녕 다시 시작해보자</h1>
      <div>
        <div>
          <button onClick={navigateToPage}>글쓰기</button>
        </div>
        <div>
          <button>삭제</button>
        </div>
      </div>

      <div>
        {redered}
        {!hasMore && <p>마지막 페이지입니다.</p>}
      </div>
    </>
  )
}

export default GuestBook;