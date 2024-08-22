import React, { useState, ReactNode } from 'react';
import { useLongPress, LongPressEventType } from 'use-long-press';
import '../styles/global.css';
import '../styles/mypage.css';

type ProfileImgProps = {
    children?: ReactNode;
};

const ProfileImg: React.FC<ProfileImgProps> = ({ children }) => {
    return (
        <div>{children}</div>
    );
};

const LongPress: React.FC = () => {
    const [url, setUrl] = useState('http://localhost:3000/mycollection'); // 새 창으로 열 URL

    const handleLongPress = () => {
        // 새 창으로 URL 열기
        window.open(url, '_blank');
    };

    // useLongPress 훅 설정
    const longPressEvents = useLongPress(handleLongPress, {
        threshold: 500, // 500ms 동안 누르면
        captureEvent: true,
        cancelOnMovement: false,
        detect: LongPressEventType.Touch, // 올바른 열거형 사용
    });

    return (
        <div>
            <button {...longPressEvents()}>
                <ProfileImg>
                    <img src="path/to/your/image.jpg" alt="Long Press Me" />
                </ProfileImg>
            </button>
        </div>
    );
};

export default LongPress;