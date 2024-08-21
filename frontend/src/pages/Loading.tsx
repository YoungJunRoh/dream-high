import { ClockLoader } from 'react-spinners';
import '../styles/loading.css';
import React, { useEffect } from 'react'; // useEffect 임포트 추가



const Loading = ({ loading }) => {
    useEffect(() => {
        const starsContainer = document.querySelector('.stars');

        function createStar() {
            const star = document.createElement('div');
            star.className = 'star';

            // 랜덤 크기 설정 (더 크게)
            const size = Math.random() * 10 + 2; // 5px에서 15px
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;


            // 별의 X축 이동 범위를 두 배로 넓힘
            star.style.setProperty('--random-x', `${(Math.random() * 100 - 100)}%`); // -200px에서 200px까지 랜덤하게 이동

            // 랜덤한 시작 위치 설정
            const randomX = (Math.random() - 0.5) * 900; // -100px에서 100px까지 랜덤하게 이동
            star.style.setProperty('--random-x', `${randomX}px`); // CSS 변수에 랜덤값 설정
            star.style.left = `${Math.random() * 100}%;` // 각기 다른 X 위치에서 시작

            star.style.top = `${Math.random() * -100}px`; // 화면 위쪽에서 랜덤하게 시작
            // 애니메이션 속성 설정
            star.style.animationName = 'fall'; // 애니메이션 이름 설정
            star.style.animationDuration = `${Math.random() * 4 + 4}s`; // 속도를 느리게 설정 (4초에서 8초 사이)
            star.style.animationTimingFunction = 'linear'; // 애니메이션 타이밍 설정
            star.style.animationIterationCount = 'infinite'; // 반복 설정

            // starsContainer가 null이 아닐 때만 appendChild 호출
            if (starsContainer) {
                starsContainer.appendChild(star);
            }

            // 애니메이션 끝나면 별 제거
            star.addEventListener('animationend', () => {
                star.remove();
            });
        }

        // 별 생성 주기 설정
        const starInterval = setInterval(() => {
            if (starsContainer) { // starsContainer가 null이 아닐 때만 실행
                createStar();
            }
        }, 700); // 0.5초마다 별 생성

        return () => clearInterval(starInterval); // 컴포넌트 언마운트 시 인터벌 정리
    }, []);


    return (
        <div className='background'>
            <div className="stars"></div>
            <ClockLoader className='clock'
                color="#FEE500"
                loading
                size={100}
                speedMultiplier={2}
            />
            <div className="loading-text">
                <h2> 좀만 기다려달라 냥!🐾 </h2>
            </div>
        </div>
    )
}

export default Loading;