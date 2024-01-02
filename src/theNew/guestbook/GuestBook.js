import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGetFromDatabase from "../api-database/get.js";
import useManageModalState from "../modal.js";
import useDeleteInDatabase from "../api-database/delete.js";
import useWindowPopup from "../windowPopup.js";
import usePagination from "../pagination.js";


const GuestBook = () => {
  const navigate = useNavigate();
  const goToWrite = () => {
    navigate('/guestbook/write');
  }
  
  const [selectedItem, setSelectedItem] = useState(null);
  const { isModalOpen, openModal, closeModal } = useManageModalState();

  const [isItemSelected, setIsItemSelected] = useState(false);
  const [currentSelected, setCurrentSelected] = useState(null);
  const toggle = (event) => {
    const targetDiv = event.currentTarget.closest("div[style*='flex-wrap: nowrap']").querySelector(".letterMarker");
    if (!currentSelected) {
      setCurrentSelected(targetDiv);
      if(!isItemSelected) {
        if (targetDiv) {
          targetDiv.style.backgroundColor = "#cadeeb"; // 원하는 색상으로 변경 가능
        }
        setIsItemSelected(true);
      } else {
        targetDiv.style.backgroundColor = "#d6d6d6"; // 원래로 돌아감
        setIsItemSelected(false);
      }
    } else {
      if (targetDiv === currentSelected) {
        targetDiv.style.backgroundColor = "#d6d6d6"; // 원래로 돌아감
        setIsItemSelected(false);
      } else {
        currentSelected.style.backgroundColor = "#d6d6d6"; // 원래로 돌아감
        setCurrentSelected(targetDiv);
        targetDiv.style.backgroundColor = "#cadeeb"; // 원하는 색상으로 변경 가능
        setIsItemSelected(true);
      }
    }
    
  }
  const handleItemClick = async (item, event) => {
    toggle(event);

    const selected = {
      id: item.uniqueId,
      password: item.simple_password
    }
    setSelectedItem(selected);

    if (isItemSelected) setSelectedItem(null);
  };
  
  const url = '/api/guestbook/data';
  
  const cleaning = `DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') AS lastUpdatedAt`;
  const getQuery = {
    'select': `id, uniqueId, name, simple_password, title, comment, ${cleaning}`,
    'where': ``
  };

  const { data } = useGetFromDatabase(url, getQuery); // get 요청
  data.sort((a, b) => new Date(b.lastUpdatedAt) - new Date(a.lastUpdatedAt)); // 최신순으로 재정렬
  
  const redering = (item) => {
    return (
      <div key={item.uniqueId} style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center' }}>
        <div className="letterMarker" style={{ display: 'flex', width: '16px', minHeight: '280px', margin: '16px 0px 16px 16px', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', backgroundColor: '#d6d6d6' }}></div>
        <div onClick={(event) => handleItemClick(item, event)} style={{ display: 'flex', width: '500px', minHeight: '280px', margin: '16px 16px 16px 0px', padding: '8px 24px', border: '1px solid #d6d6d6', borderTopRightRadius: '4px', borderBottomRightRadius: '4px', alignContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', width: '100%', height: 'fit-content', justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
            <div>{item.lastUpdatedAt}</div>
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
  
  const { currentData, currentPage, setCurrentPage, maxPage } = usePagination(data, redering, 3);
  
  const passwordInput = useRef(null);
  const { deleteData } = useDeleteInDatabase(url); // 삭제

  const handleClickDelete = () => {
    console.log('왜?', selectedItem);
    if (!selectedItem) {
      alert('삭제할 항목을 선택해주세요.');
      return;
    }
    openModal();
  }

  const deleteItem = () => {
    const currentValue = passwordInput.current.value;

    if (selectedItem.password == currentValue) {
      deleteData(selectedItem);
    } else {
      alert('비밀번호가 다릅니다.');
    }
    closeModal();
    // toggleClass();
  }

  const handleClickEdit = () => {
    if (!selectedItem) {
      alert('수정할 항목을 선택해주세요.');
      return;
    }
    // toggleClass();
    navigate('/guestbook/edit', { state : { id: selectedItem.id } }); // edit 화면으로 데이터 전달
  }
  
  return (
    <>
      <h1>방명록</h1>
      <div style={{ display: 'flex', padding: '8px 32px', flexWrap: 'nowrap', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <button onClick={goToWrite}>글쓰기</button>
        </div>
        <div style={{ display: 'flex', width: '100px', justifyContent: 'space-between' }}>
          <button onClick={handleClickEdit}>수정</button>
          <button onClick={handleClickDelete}>삭제</button>
        </div>
      </div>

      {/* 페이지네이션 */}
      <div>
        {currentData()}
      </div>
      <div style={{ display: 'flex', width: '100%', margin: '20px 0px', justifyContent: 'center', alignItems: 'center' }}>
        {Array.from({ length: maxPage }, (_, index) => index + 1).map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            style={{ margin: '0 5px', padding: '5px 10px', border: pageNumber === currentPage ? '2px solid blue' : '1px solid #ddd' }}
            disabled={pageNumber === currentPage}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      
      {isModalOpen && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '1000' }}>
          <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '2px' }}>
            <input type="text" ref={passwordInput} />
            <button onClick={deleteItem}>확인</button>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </>
  )
}

export default GuestBook;