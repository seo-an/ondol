import { useState, useEffect } from 'react';

const useManageLayerState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // 스크롤 금지
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = ''; // 원래 스타일로 복원
  };

  // 배경 클릭 시 모달 닫기를 위한 이벤트 핸들러 추가
  useEffect(() => {
    const handleBackgroundClick = (event) => {
      if (event.target.classList.contains('modal-background')) {
        closeModal();
      }
    };

    if (isModalOpen) {
      // 모달이 열릴 때 이벤트 리스너를 추가한다.
      window.addEventListener('click', handleBackgroundClick);
    }

    // 클린업 함수: 모달이 닫힐 때 이벤트 리스너를 제거한다.
    return () => {
      window.removeEventListener('click', handleBackgroundClick);
    };
  }, [isModalOpen]); // 의존성 배열에 isModalOpen을 추가하여 모달 상태 변화 시에만 이펙트가 실행되도록 한다.

  return { isModalOpen, openModal, closeModal };
};

export default useManageLayerState;
