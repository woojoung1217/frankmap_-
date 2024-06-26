"use client"


import Modal from "@/components/modal/modal";
import { useModal } from "@/hooks/useModal";



const ModalTest = () => {
  const { openModal } = useModal();

  const modalData = {
    title: '전희선',
    content: 'designh2sun@gmail.com',
    callback: () => {}, // 로그아웃 버튼 클릭 이벤트 작성
  };

  return (
    <>
      <button onClick={() => openModal(modalData)}>모달 열기</button>
      <Modal />
    </>
  )
}

export default ModalTest;