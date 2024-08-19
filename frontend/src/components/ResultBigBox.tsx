import React from "react";
import '../styles/result.css';
import '../styles/global.css';

type BigBox = {
    message: string; // message prop의 타입 정의
}

const ResultBigBox: React.FC<BigBox> = ({message}) => {
    return(
        <div className='result-bigbox'>
            {message}
        </div>
    );
}

export default ResultBigBox;