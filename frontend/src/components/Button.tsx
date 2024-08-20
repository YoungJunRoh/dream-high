import React from 'react';
import '../styles/global.css';
import '../styles/button.css';

type ButtonProps = {
    mode?: 'main' | 'result' | 'share' | 'gotarot' | 'login'; // 모드 제한
    name: string;
    draggable: boolean;
    onClick?: () => void; // onClick 속성 추가
};

// 버튼 width 글자 크기에 따라 늘어나도록 구현
const Button: React.FC<ButtonProps> = ({ mode, name, draggable, onClick }) => {
    let currentClass: string = 'pixel-btn-rounded'; // 기본 클래스
    const currentDraggable: string = draggable ? ' draggable' : '';

    // 모드에 따라 클래스 이름 변경
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

    return (
        <button
            className={`${currentClass}${currentDraggable}`} // 클래스 조합
            onClick={onClick} // onClick 이벤트 핸들러 추가
        >
            {name} {/* 버튼 텍스트 */}
        </button>
    );
}

export default Button;