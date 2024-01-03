import useManageModalState from "../popupModal.js";

// modal 팝업 (버튼 있음) 예시 화면
const ModalExample = () => {
  const { isModalOpen, openModal, closeModal } = useManageModalState();

  return (
    <div>
      <button onClick={openModal}>모달 열기</button>
      
      {isModalOpen && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '1000' }}>
          <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '2px' }}>
            <p>모달 팝업 예제입니다.</p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalExample;
