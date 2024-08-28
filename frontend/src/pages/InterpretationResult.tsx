import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBalloon from '../components/ChatBalloon.tsx';
import Button from '../components/Button.tsx';
import '../styles/result.css';
import '../styles/global.css';
import ResultBox from '../components/ResultBox.tsx';
import ResultBigBox from '../components/BigBox.tsx';
import ResultSmallBox from '../components/SmallBox.tsx';
import Footer from '../components/Footer.tsx';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import Share from '../components/Share.tsx';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import rulru from '../assets/rulru-result.png';

const ResultCat = styled.div`
    background-image: url(${rulru});
    display: flex;
    flex-direction: column;
    align-items: center;
    background-repeat: no-repeat;
    width: 100vw;
    height: 250vw;
    margin-top: 6px;
    /* 화면의 1/4 차지하도록 설정 */
    background-position: center;
    /* 중앙에 위치하도록 설정 */
    background-size: contain;
    /* 이미지의 비율을 유지하며 크기를 조절 */
`;

interface LocationState {
    advice: string;
    interpertaionKeyword: string;
    summary: string;
    dreamContent: string;
    interpertaionContent: string;
}

const InterpretationResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState | null;

    const boardId: number = 1;
    const username: string = '아무개';

    const interpertaionKeyword = state?.interpertaionKeyword as string;
    const advice = state?.advice as string;
    const summary = state?.summary as string;
    const dreamContent = state?.dreamContent as string;
    const interpertaionContent = state?.interpertaionContent as string;

    const captureRef = useRef<HTMLDivElement>(null);

    const handleCapture = async () => {
        if (captureRef.current) {
            const canvas = await html2canvas(captureRef.current);
            const dataUrl = canvas.toDataURL('image/png');

            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'dream_result.png';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            Swal.fire({
                title: '오류',
                text: '캡처할 수 없습니다.',
                icon: 'error',
                confirmButtonText: '확인',
            });
        }
    };

    const goToTarotPage = () => {
        navigate('/preparing');
    };

    return (
        <React.Fragment>
            <div className='background-morning' ref={captureRef}>
                <ResultCat>
                    <ChatBalloon message={advice} />
                </ResultCat>
                <div id='marginbox'>
                    <ResultBox message={summary} mode='board' />
                </div>
                <div className='bottom-button'>
                    <div id='result-sharing'>
                        <p className='font-bold'>공유하기</p>
                        <div id="result-sharing-area">
                            <Share boardId={boardId} username={username} content={dreamContent} />
                        </div>
                        <div className='result-imgdown'>
                            <Button name="이미지로 저장하기" mode="save-image" onClick={handleCapture} />
                        </div>
                    </div>
                </div>
                <ResultSmallBox name='자세한 꿈해몽이다 냥냥🐾' mode='resultbox' />
                <ResultBigBox mode='resultbox'>{interpertaionContent}</ResultBigBox>
                <Button
                    name='타로도 보러갈래냥?🐾'
                    mode='gotarot'
                    draggable={true}
                    onClick={goToTarotPage}
                />
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default InterpretationResult;
