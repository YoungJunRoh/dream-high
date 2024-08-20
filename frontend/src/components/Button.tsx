import React, { useState, ReactNode } from 'react';
import '../styles/global.css';
import '../styles/button.css';
import styled from 'styled-components';


// Modal Container
export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

// 백그라운드
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
`;

// 모달창 CSS
export const ModalView = styled.div.attrs(() => ({
    role: 'dialog',
}))`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 430px;
  height: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  div {
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

type ButtonProps = {
    mode?: string;
    name: string;
    draggable?: boolean;
    children?: ReactNode;
    option?: string;
}

// 버튼 width 글자 크기에 따라 늘어나도록 GPT 한테 커스텀 받기
const Button: React.FC<ButtonProps> = ({ mode, name, draggable = true, option, children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModalHandler = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    let currentClass: string = 'main-button';
    const currentDraggable: string = draggable ? ' draggable' : '';
  
    switch (mode) {
        case 'main':
            currentClass = 'main-button'; // main 모드 클래스
            break;
        case 'result':
            currentClass = 'result-button'; // result 모드 클래스
            break;
        case 'share':
            currentClass = 'result-button'; 
            break;
        case 'gotarot':
            currentClass = 'go-tarot-button'; // gotarot 모드 클래스
            break;
        case 'login':
            currentClass = 'go-login-button';
            break;
        default:
            break; // 기본 클래스 유지
    }

    if (option === 'modal') {
        return (
            <>
                <ModalContainer>
                    <button
                        className={currentClass + currentDraggable}
                        onClick={openModalHandler}
                    >
                        {name}
                    </button>
                    {isOpen ? (
                        <ModalBackdrop onClick={openModalHandler}>
                            <ModalView onClick={(event) => event.stopPropagation()}>
                                <div onClick={openModalHandler}>❌</div>
                                {children}
                            </ModalView>
                        </ModalBackdrop>
                    ) : null}
                </ModalContainer>
            </>
        );
    }

    return (
        <button
            className={`${currentClass}${currentDraggable}`} // 클래스 조합
        >
            {name} {/* 버튼 텍스트 */}
        </button>
    );
}

export default Button;