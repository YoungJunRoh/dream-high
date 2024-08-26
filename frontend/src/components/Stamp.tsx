import React from 'react';

interface StampProps {
    count: number; // 스탬프 개수
}

const Stamp: React.FC<StampProps> = ({ count }) => {
    // 스탬프 개수가 0일 경우 빈 콘텐츠 반환
    if (count === 0) {
        return <div id='mypage-stamp'>스탬프가 없습니다.</div>;
    }

    const stamps = Array.from({ length: count }); // 스탬프 개수만큼 배열 생성
    const pattern: JSX.Element[] = []; // 최종 패턴을 저장할 배열

    // 스탬프 개수에 따라 패턴 생성
    stamps.forEach((_, index) => {
        pattern.push(<div key={`stamp-${index}`} className='stamp'></div>); // 스탬프 추가
        if (index !== stamps.length - 1) { // 마지막 인덱스가 아닐 때만 빈 공간 추가
            pattern.push(<div key={`space-${index}`} className='space'></div>); // 빈 공간 추가
        }
    });

    return (
        <div id='mypage-stamp'>
            {pattern} {/* 생성된 패턴 렌더링 */}
        </div>
    );
}

export default Stamp;
