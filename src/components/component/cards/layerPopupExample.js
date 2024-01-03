import useManageLayerState from "../popupLayer.js";

// modal 배경클릭해서 닫기
const LayerExample = () => {
  const { isModalOpen, openModal, closeModal } = useManageLayerState();

  return (
    <div>
      <button onClick={openModal}>모달 열기</button>

      {isModalOpen && (
        <div className="modal-background" style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '1000' }}>
          <div className="modal-content" style={{ padding: '16px', backgroundColor: 'white', borderRadius: '2px' }}>
            <p>레이어 팝업 예제입니다. 닫으려면 배경을 클릭해주세요.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayerExample;