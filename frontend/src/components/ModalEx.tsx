import React, { useState } from 'react';
import Button from './Button'; // 버튼 컴포넌트 경로

const ModalComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false); // 모달 열림 상태

    const handleOpenModal = () => {
        setIsOpen(true); // 모달 열기
    };

    const handleCloseModal = () => {
        setIsOpen(false); // 모달 닫기
    };

    return (
        <div>
            <Button mode="main" name="모달 열기" draggable={false} onClick={handleOpenModal} />
            
            {isOpen && (
                <div className="modal">
                    <h2>모달 제목</h2>
                    <p>모달 내용이 여기에 들어갑니다.</p>
                    <Button mode="main" name="닫기" draggable={false} onClick={handleCloseModal} />
                </div>
            )}
        </div>
    );
};

export default ModalComponent;