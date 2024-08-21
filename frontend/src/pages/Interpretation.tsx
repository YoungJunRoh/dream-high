import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/home.css';
import '../styles/interpretation.css';
import Button from '../components/Button.tsx';
import BirthDaySelect from '../components/BirthDaySelect.tsx';
import useKeyboardAvoider from '../hooks/useKeyboardAvoider.tsx';
import axios from 'axios';

const Interpretation = () => {
    useKeyboardAvoider();
    const [content, setPrompt] = useState<string>('');
    const [responseMessage, setResponseMessage] = useState<string | null>(null);


    const promptHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
        console.log('Submitted text: ', content);
    }

    const handleSubmit = async () => {
        const datas = { prompt : content };

    try {
      const response = await axios.post('http://localhost:8080/dreams', datas);
      setResponseMessage('Data submitted successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      setResponseMessage('Failed to submit data.');
      console.error('Error:', error);
    }
    }
    
    return (
        <div className='background-night'>
            <div className='interpretation-background-cat'>
                <div className='interpretation-blank' />
                <textarea
                    className='interpretation-input font-normal'
                    placeholder='꿈을 입력하라냥'
                    onChange={promptHandler}

                >
                </textarea>
                <div className='interpretation-button-area'>
                    <BirthDaySelect></BirthDaySelect>
                        <Button name='완료' mode='result' draggable={true} onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}

export default Interpretation;