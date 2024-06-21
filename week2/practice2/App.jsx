import React, { useState } from 'react';
import './index.css';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h1>안녕하세요!</h1>
      <p>내용내용내용</p>
      <button onClick={openModal}>버튼 열기</button>
      {isModalOpen && (
        <div className="modal-wrapper">
          <div className="modal">
            <div className="modal-title">안녕하세요</div>
            <p>모달 내용은 어쩌고 저쩌고..</p>
            <div className="close-wrapper">
              <button onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
