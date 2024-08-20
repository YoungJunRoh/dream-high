import React from 'react';
import '../styles/board.css';
import '../styles/global.css';

type BoardList = {
    no: number;
    content: string;
    created: string;
}

const BoardList = () => {  // 수정
    return (
        <div id='board-list-container' className='font-normal'>
            <div className='board-no'>1</div>
            <div className='board-content font-extrabold font-size-17 order-left'>귀신이 꿈에 나왔는데 치킨을 나한테</div>
            <div className='board-created'>10시간전</div>
            {/* API 받아서 Map */}
        </div>
    );
}

export default BoardList; // 수정