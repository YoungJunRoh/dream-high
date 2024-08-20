import React from "react";
import '../styles/result.css';
import '../styles/global.css';

type BigBox = {
    message?: string; // message prop의 타입 정의
    mode?: 'resultbox' | 'loginbox'  ; // 모드 제한
}

const ResultBigBox: React.FC<BigBox> = ({ message, mode }) => {
    let currentClass = ''; // currentClass 변수를 초기화

    switch (mode) {
        case 'resultbox':
            currentClass = 'result-bigbox'; 
            break;
        case 'loginbox':
            currentClass = 'result-loginbigbox'; 
            break;
        default:
            break;
    }

    return(
        <div className={currentClass}>
            {message && <span>{message}</span>}
        </div>
    );
}

export default ResultBigBox;