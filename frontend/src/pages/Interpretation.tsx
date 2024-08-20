<<<<<<< HEAD
import React from 'react';
=======
import React, { useEffect } from 'react';
import '../styles/global.css';
import '../styles/home.css';
import '../styles/interpretation.css';
import Button from '../components/Button.tsx';
import BirthDaySelect from '../components/BirthDaySelect.tsx';
import useKeyboardAvoider from '../hooks/useKeyboardAvoider.tsx';
>>>>>>> 88a10867db9d473d62ae6ae2136becf42a433ae4

function Interpretation() {
    useKeyboardAvoider();
    
    return (
<<<<<<< HEAD
        <div>
            <h1>DreamInterpretation</h1>
=======
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
>>>>>>> 88a10867db9d473d62ae6ae2136becf42a433ae4
        </div>
    );
  }
  
  export default Interpretation;