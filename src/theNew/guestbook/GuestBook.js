import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGetFromDatabase from "../api-database/get.js";
import useScrollLoadingData from "../scrolling.js";
import useManageModalState from "../modal.js";
import useDeleteInDatabase from "../api-database/delete.js";


const GuestBook = () => {
  const navigate = useNavigate();
  const goToWrite = () => {
    navigate('/write');
  }
  
  const [selectedItem, setSetlectedItem] = useState(null);
  const { isModalOpen, openModal, closeModal } = useManageModalState();

  const handleItemClick = async (item) => {
    const selected = {
      id: item.uniqueId,
      password: item.simple_password
    }
    setSetlectedItem(selected);
  }
  
  const url = '/api/guestbook/data';
  
  const cleaning = `DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') AS lastUpdatedAt`;
  const getQuery = {
    'select': `uniqueId, name, simple_password, title, comment, ${cleaning}`,
    'where': ``
  };

  const { data } = useGetFromDatabase(url, getQuery); // get 요청

  const redering = (item) => {
    return (
      <div key={item.uniqueId} style={{ display: 'flex', flexWrap: 'nowrap' }}>
        <div style={{ display: 'flex', width: '16px', minHeight: '280px', margin: '16px 0px 16px 16px', backgroundColor: '#d6d6d6' }}></div>
        <div onClick={() => handleItemClick(item)} style={{ display: 'flex', width: '520px', minHeight: '280px', margin: '16px 16px 16px 0px', padding: '8px', border: '1px solid #d6d6d6', alignContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', width: '100%', height: 'fit-content', justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
            <div>{item.lastUpdatedAt}</div>
            <div style={{ marginLeft: '8px' }}><button>수정</button></div>
          </div>
          <div style={{ display: 'flex', width: '100%', height: 'calc(100% - 24px)', alignContent: 'space-between', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', width: '100%' }}>{item.title}</div>
              <div style={{ display: 'flex', width: '100%' }}>{item.comment}</div>
            </div>
            <div style={{ display: 'flex', marginRight: '16px' }}>{item.name}</div>
          </div>
        </div>
      </div>
    );
  };
  
  const { redered, hasMore } = useScrollLoadingData(data, redering, 2); // 리로딩
  
  const passwordInput = useRef(null);
  const { deleteData } = useDeleteInDatabase(url); // 삭제
  const handleClickDelete = () => {
    const currentValue = passwordInput.current.value;
    // console.log('🍎', selectedItem.password, currentValue);
    
    if (!selectedItem) alert('선택된 항목이 없습니다.');

    if (selectedItem.password == currentValue) {
      deleteData(selectedItem);
    } else {
      alert('비밀번호가 다릅니다.');
    }
    
    closeModal();
  }
  
  
  
  return (
    <>
      <h1>방명록</h1>
      <div>
        <div>
          <button onClick={goToWrite}>글쓰기</button>
        </div>
        <div>
          <button onClick={openModal}>삭제</button>
        </div>
      </div>

      <div>
        {redered}
        {!hasMore && <p>마지막 페이지입니다.</p>}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '1000' }}>
          <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '2px' }}>
            <input type="text" ref={passwordInput} />
            <button onClick={handleClickDelete}>닫기</button>
          </div>
        </div>
      )}
    </>
  )
}

export default GuestBook;