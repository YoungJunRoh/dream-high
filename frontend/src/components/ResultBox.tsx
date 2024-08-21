import React from 'react';
import '../styles/global.css';
import '../styles/result.css';

type Box = {
    message: string; // message prop의 타입 정의
}

const ResultBox: React.FC<Box> = ({ message }) => {  // 수정
    return (
        <div className='result-message'>
            {message}
        </div>
    );
}

export default ResultBox; 