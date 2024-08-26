import React from 'react';
import styled from 'styled-components';
import stamp01 from '../assets/img-stamp01.png';
import stamp02 from '../assets/img-stamp02.png';
import stamp03 from '../assets/img-stamp03.png';
import stamp04 from '../assets/img-stamp04.png';
import noStamp from '../assets/img-no-stamp.png';

interface StampProps {
    count: number; // 스탬프 개수
}

const StampContainer = styled.div`
    flex-direction: column;
`;

const StampLine = styled.div`
    flex-direction: row;
`;

const Stamp: React.FC<StampProps> = ({ count }) => {
    let stamp1 = noStamp;
    let stamp2 = noStamp;
    let stamp3 = noStamp;
    let stamp4 = noStamp;
    let stamp5 = noStamp;

    let currentCount = count;

    if (count < 5) {
        currentCount %= 5;
    }

    if (currentCount >= 1) {
        stamp1 = stamp01;
    }

    if (currentCount >= 2) {
        stamp2 = stamp02;
    }

    if (currentCount >= 3) {
        stamp3 = stamp03;
    }

    if (currentCount >= 4) {
        stamp4 = stamp04;
    }

    if (currentCount >= 5) {
        stamp5 = stamp01; // 변경: 5번째 스탬프도 올바른 값으로 설정
    }

    return (
        <StampContainer>
            <StampLine>
                <img src={stamp1} />
                <img src={stamp2} />
                <img src={stamp3} />
                <img src={stamp4} />
                <img src={stamp5} />
            </StampLine>
        </StampContainer>
    );
}

export default Stamp;
