import React from 'react';

interface StampProps {
    count: number; // 스탬프 개수
}

const Stamp: React.FC<StampProps> = ({ count }) => {
    return (
        <div></div>
    );
}

export default Stamp;
