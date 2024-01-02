import { useState } from 'react';

const useManageModalState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // 스크롤 금지
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = ''; // 원래 스타일로 복원
  };

  return { isModalOpen, openModal, closeModal };
};

export default useManageModalState;
