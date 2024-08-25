import React, { useRef } from 'react';
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
import Swal from 'sweetalert2';

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
    const cardRef = useRef<HTMLLIElement>(null);

    const onDownloadImg = (): void => {
        if (cardRef.current) {
            domtoimage.toBlob(cardRef.current)
                .then(blob => {
                    saveAs(blob, 'card.png');
                })
                .catch(error => {
                    // 에러 메시지
                });
        }
    };

    return (
        <div className='background-morning'>
            <div className='result-cat'>
                <ChatBalloon message={advice} />
            </div>
            <div id='marginbox'>
            <ResultBox message={summary} mode='board' />
            </div>
            <div className='bottom-button'>
                {/* <Link to={'/dream-interpretation'}>
                    <Button
                        name='result'
                        mode='result'
                        draggable={true}>
                    </Button>
                </Link> */}
              
            </div>
            <ResultSmallBox name='자세한 꿈해몽이다 냥냥🐾'  mode='resultbox' />
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