import React, { useEffect } from 'react';
import ChatBalloon from '../components/ChatBalloon.tsx';
import Button from '../components/Button.tsx';
import '../styles/result.css';
import '../styles/global.css';
import ResultBox from '../components/ResultBox.tsx';
import ResultBigBox from '../components/BigBox.tsx';
import ResultSmallBox from '../components/SmallBox.tsx';
import Footer from '../components/Footer.tsx';
import Share from './Share.tsx';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

interface DreamDatas {
    advice: string;
    interpertaionKeyword: string[];
    summary: string;
    dreamContent: string;
    interpertaionContent: string;
    boardId: number
    username: string | null
}

const BoardContent: React.FC<DreamDatas> = ({ advice, interpertaionKeyword, summary, dreamContent, interpertaionContent, boardId, username }) => {
    const onDownloadImg = (): void => {
        domtoimage.toBlob(document.querySelector('.card') as HTMLElement).then(blob => {
            saveAs(blob, 'card.png');
        });
    };

    return (
        <div className='background-morning'>
            <div className='result-cat'>
                <ChatBalloon message={advice} />
            </div>
            <ResultBox message={summary} />
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
                        <Share
                            boardId={boardId}
                            username={username}
                            content={dreamContent}
                        />
                        <div id='result-sharing-insta'></div>
                        <div id='result-sharing-x'></div>
                        <div id='result-sharing-link'></div>
                    </div>
                    <span className='font-normal result-font-size-18'>이미지로 저장하기</span>
                </div>
            </div>
            <ResultSmallBox name='자세한 꿈해몽이다 냥냥🐾' />
            <ResultBigBox mode='resultbox'>{interpertaionContent}</ResultBigBox>
            <Button
                name='타로 보러갈래냥?🐾'
                mode='gotarot'
                draggable={true}>
            </Button>
            <Footer></Footer>
        </div>
    );
}

export default BoardContent;