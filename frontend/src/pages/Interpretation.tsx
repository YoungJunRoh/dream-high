import React from 'react';

import '../styles/global.css';
import '../styles/home.css';
import '../styles/interpretation.css';
import Button from '../components/Button.tsx';

function Interpretation() {
    return (
        <div className='background-night'>
            <div className='interpretation-background-cat'>
                <div className='interpretation-blank' />

            </div>
            <div className='interpretation-button-container'>
                <textarea
                    className='interpretation-input font-normal'
                    placeholder='꿈을 입력하라냥'
                >
                </textarea>
                <div className='interpretation-button'>
                    <Button name='완료' mode='result' draggable={true} />
                </div>

            </div>
        </div>
    );
}

export default Interpretation;