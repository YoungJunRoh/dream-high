import React from 'react';
import ChatBalloon from '../components/ChatBalloon.tsx';
import resultData from '../static/resultData.tsx';
import Button from '../components/Button.tsx';
import { Link } from 'react-router-dom';
import '../styles/result.css';
import ResultBox from '../components/ResultBox.tsx';
import resultBoxData from '../static/resultBoxData.tsx';
import AllResultBox from '../components/BigBox.tsx';
import allresultData from '../static/allResultData.tsx';
import ResultBigBox from '../components/BigBox.tsx';
import ResultSmallBox from '../components/SmallBox.tsx';
import Footer from '../components/Footer.tsx';

function InterpretationResult() {
    return (
        <div className='background-morning'>
            <div className='result-cat'>
                <ChatBalloon message={resultData} />
            </div>
            <ResultBox message={resultBoxData} />
            <div className='bottom-button'>
                <Link to={'/dream-interpretation'}>
                    <Button
                        name='result'
                        mode='result'
                        draggable={true}>
                    </Button>
                </Link>
                <div className='blank' />
                <Button
                    name='share'
                    mode='result'
                    draggable={true}
                    option='modal'
                    >
                        <Button name='트위터 공유하기' mode='result'></Button>
                        <p></p>
                        <Button name='인스타 공유하기' mode='result'></Button>
                        <p></p>
                        <Button name='카카오톡 공유하기' mode='result'></Button>
                        <p></p>
                        <Button name='링크 복사하기' mode='result'></Button>
                </Button>
            </div>
            <ResultSmallBox name='자세한 꿈해몽이다 냥냥🐾'/>
            <ResultBigBox message={allresultData} />
            <Button
            name='타로 보러갈래냥?🐾'
            mode='gotarot'
            draggable={true}>
            </Button>
            <Footer></Footer>
        </div>
    );
}

export default InterpretationResult;