import { useModal } from "@/hooks/useModal";
import "@/components/modal/modal.scss"
import Button from "../button/button";

const Modal = () => {
  const { modalDataState, closeModal } = useModal();


  return (
    <>
      { modalDataState.isOpen && (
        <div className="modal-container">
          <button className="modal-close-button" onClick={closeModal}>닫기</button>
          <div className="modal-title">
            <h1>{modalDataState.title}</h1>
          </div>
          <div className="modal-content">
            <div>{modalDataState.content}</div>
          </div>
          <div className="modal-footer">
            <Button handleClick={modalDataState.callBack} size="normal" color="secondary">{modalDataState.button}</Button>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal;