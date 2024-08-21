import React, { useState, useRef } from 'react';

const TermsModal: React.FC<{ onClose: () => void; onAgree: () => void; }> = ({ onClose, onAgree }) => {
    const [isAgreed, setIsAgreed] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        const element = contentRef.current;
        if (element) {
            const { scrollTop, scrollHeight, clientHeight } = element;
            // 스크롤이 끝까지 도달했는지 확인
            if (scrollTop + clientHeight >= scrollHeight - 1) {
                setIsAgreed(true);
            }
        }
    };

    const handleAgree = () => {
        if (isAgreed) {
            onAgree();
            onClose();
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>오늘드림 이용약관</h2>
                <div
                    className="terms-content"
                    onScroll={handleScroll}
                    ref={contentRef}
                    style={{ height: '200px', overflowY: 'scroll', padding: '10px', border: '1px solid #ccc' }}
                >
                    <p>"알고 계셨냥? 꿈은 평균 90분마다 나타난다는 사실이다냥~ 😴",
    "알고 계셨냥? 대부분의 꿈은 깨어나면 10분 내에 90% 이상을 잊어버린다냥~ 🧠",
    "알고 계셨냥? 모든 사람은 꿈을 꾸지만 기억하지 못할 뿐이다냥~ 💤",
    "알고 계셨냥? 일부 사람들은 꿈을 흑백으로 꾸는데, 이는 흑백 TV가 있을 때 더 흔했었다냥~ 📺",
    "알고 계셨냥? 꿈에 나오는 낯선 사람들은 사실 우리가 일상에서 한 번쯤 스쳐 지나갔던 사람일 수도 있다냥~ 👀",
    "알고 계셨냥? 꿈을 꾸는 동안 우리의 몸은 마비 상태가 되어 꿈속에서 하는 행동을 현실에서 따라하지 않도록 보호해준다냥~ 🛌",
    "알고 계셨냥? 외부 자극이 꿈에 반영되기도 한다냥~ 예를 들어 자는 동안 들리는 소리가 꿈의 내용에 영향을 줄 수 있다냥~ 🎶",
    "알고 계셨냥? 고양이도 꿈을 꾼다냥~ 🐱",
    "알고 계셨냥? 스트레스를 많이 받을수록 악몽을 더 자주 꿀 수 있다냥~ 😨",
    "알고 계셨냥? 꿈에서의 시간은 현실과 다를 수 있다냥~ 꿈속에서는 몇 시간이 지나간 것처럼 느껴져도 사실 몇 분밖에 지나지 않았을 수 있다냥~ ⏳",
    "알고 계셨냥? 루시드 드림이라고 해서, 꿈을 꾸면서 자신이 꿈을 꾸고 있다는 사실을 인식할 수 있는 경우도 있다냥~ 🌙",
    "알고 계셨냥? 꿈은 감정의 해소와 문제 해결에 도움이 될 수 있다냥~ 😌",
    "알고 계셨냥? 잠을 많이 자지 못하면 꿈을 더 자주 꾸게 될 가능성이 높다냥~ 🕒",
    "알고 계셨냥? 고대 문명에서도 꿈은 미래를 예측하는 중요한 요소로 여겨졌다고 한다냥~ 🔮",
    "알고 계셨냥? 약물이나 음식도 꿈에 영향을 미칠 수 있다냥~ 🍽️"</p>
                </div>
                <button onClick={handleAgree} disabled={!isAgreed}>
                    동의합니다
                </button>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default TermsModal;
