import React from 'react';
import ChatBalloon from '../components/ChatBalloon.tsx';
import resultData from '../static/resultData.tsx';
import Button from '../components/Button.tsx';
import { Link } from 'react-router-dom';
import '../styles/result.css';
import ResultBox from '../components/ResultBox.tsx';
import resultBoxData from '../static/resultBoxData.tsx';
import AllResultBox from '../components/ResultBigBox.tsx';
import allresultData from '../static/allResultData.tsx';
import ResultBigBox from '../components/ResultBigBox.tsx';
import ResultSmallBox from '../components/ResultSmallBox.tsx';

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
                    draggable={true}>
                </Button>
            </div>
            <ResultSmallBox name='자세한 꿈해몽이다 냥냥🐾'/>
            <ResultBigBox message={allresultData} />
        </div>
    );
}

export default InterpretationResult;