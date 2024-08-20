import React, { useEffect } from 'react';
import '../styles/global.css';
import '../styles/home.css';
import '../styles/interpretation.css';
import Button from '../components/Button.tsx';
import BirthDaySelect from '../components/BirthDaySelect.tsx';
import useKeyboardAvoider from '../hooks/useKeyboardAvoider.tsx';

function Interpretation() {
    useKeyboardAvoider();
    
    return (
        <div className='background-night'>
            <div className='interpretation-background-cat'>
                <div className='interpretation-blank' />
                <textarea
                    className='interpretation-input font-normal'
                    placeholder='꿈을 입력하라냥'
                >
                </textarea>
                <div className='interpretation-button-area'>
                    <BirthDaySelect></BirthDaySelect>
                    <Button name='완료' mode='result' draggable={true} />
                </div>
            </div>
        </div>
    );
}

export default Interpretation;