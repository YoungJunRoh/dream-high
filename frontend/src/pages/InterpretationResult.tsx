import React, { useEffect, useRef } from 'react';
import ChatBalloon from '../components/ChatBalloon.tsx';
import Button from '../components/Button.tsx';
import '../styles/result.css';
import '../styles/global.css';
import ResultBox from '../components/ResultBox.tsx';
import ResultBigBox from '../components/BigBox.tsx';
import ResultSmallBox from '../components/SmallBox.tsx';
import Footer from '../components/Footer.tsx';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas'; // html2canvas 라이브러리 가져오기

interface LocationState {
    advice: string;
    interpertaionKeyword: string;
    summary: string;
    dreamContent: string;
    interpertaionContent: string;
}

const InterpretationResult = () => {
    const location = useLocation();
    const state = location.state as LocationState | null;

    const interpertaionKeyword = state?.interpertaionKeyword as string;
    const advice = state?.advice as string;
    const summary = state?.summary as string;
    const dreamContent = state?.dreamContent as string;
    const interpertaionContent = state?.interpertaionContent as string;

    const captureRef = useRef<HTMLDivElement>(null);
    const handleCapture = async () =>{
        if(captureRef.current) {
            const canvas = await html2canvas(captureRef.current);
            const dataUrl = canvas.toDataURL("image/png");

            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'dream_interpretation_result.png';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    return (
        <div className='background-morning' ref={captureRef}>
            <div className='result-cat'>
                <ChatBalloon message={advice} />
            </div>
            <ResultBox message={summary} mode='main'/>
            <div className='bottom-button'>
                {/* <Link to={'/dream-interpretation'}>
                    <Button
                        name='result'
                        mode='result'
                        draggable={true}>
                    </Button>
                </Link> */}
                <div id='result-sharing'>
                    <p className='font-bold'>공유하기</p>
                    <div id="result-sharing-area">
                        <div
                            id='result-sharing-kakao'
                            // onClick={handleShareKakaoClick}
                        ></div>
                        <div id='result-sharing-insta'></div>
                        <div id='result-sharing-x'></div>
                        <div id='result-sharing-link'></div>
                    </div>
                    <span className='font-normal result-font-size-18' onClick={handleCapture}>이미지로 저장하기</span>
                </div>
            </div>
            <ResultSmallBox name='자세한 꿈해몽이다 냥냥🐾' mode='resultbox' />
            <ResultBigBox mode='resultbox'>{interpertaionContent}</ResultBigBox>
            <Button
                name='타로도 보러갈래냥?🐾'
                mode='gotarot'
                draggable={true}>
            </Button>
            <Footer></Footer>
        </div>
    );
}

export default InterpretationResult;