import React from 'react';
import '../styles/board.css';
import '../styles/global.css';

const BoardIndex = () => {  // 수정
    return (
        <div id='board-index-container' className='font-extrabold'>
            <div className='board-index-no'>No</div>
            <div className='board-index-content'>꿈내용</div>
            <div className='board-index-created'>생성일</div>
        </div>
    );
}

export default BoardIndex; // 수정