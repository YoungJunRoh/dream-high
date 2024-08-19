import React from "react";
import '../styles/result.css';
import '../styles/global.css';

type SmallBox = {
    name: string; // message prop의 타입 정의
}

const ResultSmallBox: React.FC<SmallBox> = ({name}) => {
    return(
        <div className='result-tinybox'>
            {name}
        </div>
    );
}

export default ResultSmallBox;