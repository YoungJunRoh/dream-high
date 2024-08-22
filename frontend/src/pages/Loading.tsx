import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import '../styles/loading.css';

const MeteorKeyframe = (direction: "left" | "right", angle: number) => keyframes`
    0% {
        top: -10vh;
        transform: translateX(0px);
        opacity: 1;
    }
    100% {
        top: 110vh;
        transform: translateX(${direction === "left" ? "-" : "+"}${120 / Math.tan((angle * Math.PI) / 180)}vh);
        opacity: 1;
    }
`;

interface MeteorLayoutProps {
    $direction: "left" | "right";
    $angle: number;
}

const MeteorEffectLayout = styled.div<MeteorLayoutProps>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: linear-gradient(to top, #a7a6cb 0%, #8989ba 52%, #8989ba 100%);
    
    .star {
        position: relative;
        top: 50%;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: white;
        animation: ${(props) => MeteorKeyframe(props.$direction, props.$angle)} 4s ease-in infinite;
        opacity: 0;
    }

    .star::after {
        position: absolute;
        top: calc(50% - 1px);
        left: -950%;
        width: 2000%;
        height: 2px;
        background: linear-gradient(to left, #fff0, #ffffff);
        content: "";
        transform: ${(props) => props.$direction === "left" ? `rotateZ(-${props.$angle}deg)` : `rotateZ(-${180 - props.$angle}deg)`} translateX(50%);
    }
    
`;

interface MeteorEffectProps {
    count?: number;
    white?: boolean;
    maxDelay?: number;
    minSpeed?: number;
    maxSpeed?: number;
    angle?: number;
    direction?: "left" | "right";
}

const MAX_STAR_COUNT = 50;
const colors = ["#c77eff", "#f6ff7e", "#ff8d7e", "#ffffff"];

export default function MeteorEffect({
    count = 12,
    white = false,
    maxDelay = 15,
    minSpeed = 2,
    maxSpeed = 4,
    angle = 30,
    direction = "right"
}: MeteorEffectProps) {
    const starCount = count < MAX_STAR_COUNT ? count : MAX_STAR_COUNT;
    const [starInterval, setStarInterval] = useState<number>(0);

    useEffect(() => {
        const calcStarInterval = () => {
            let innerWidth = window.innerWidth;
            const adjustedWidth = innerWidth < 400 ? 1000 : innerWidth;
            setStarInterval(Math.floor((adjustedWidth * 1.5) / (count * 5)));
        };
        calcStarInterval();
        window.addEventListener("resize", calcStarInterval);
        return () => {
            window.removeEventListener("resize", calcStarInterval);
        };
    }, [count]);

    return (
        <MeteorEffectLayout $direction={direction} $angle={angle}>
            {(new Array(starCount)).fill(0).map((_, idx) => {
                const left = direction === "left" ? `${Math.random() * count * 5 * starInterval}px` : `${window.innerHeight - Math.random() * count * 5 * starInterval}px`;
                const animationDelay = `${Math.random() * maxDelay}s`;
                const animationDuration = maxSpeed > minSpeed ? `${minSpeed + Math.random() * maxSpeed}s` : `${2 + Math.random() * 4}`;
                const colorIndex = Math.floor(Math.random() * colors.length - 0.001);
                const size = `${2 + Math.floor(Math.random() * 5)}px`;
                const boxShadow = `0px 0px 10px 3px ${colors[colorIndex]}`;
                return (
                    <div key={idx} style={{ left, animationDelay, animationDuration, boxShadow, width: size, height: size }} className='star'></div>
                );
            })}
            <div className="loading-text">좀만 기다려달라냥 🐾</div> {/* 추가된 문구 */}
        </MeteorEffectLayout>
    );
}
