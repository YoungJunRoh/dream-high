import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/home.css';
import '../styles/interpretation.css';
import Button from '../components/Button.tsx';
import BirthDaySelect from '../components/BirthDaySelect.tsx';
import useKeyboardAvoider from '../hooks/useKeyboardAvoider.tsx';
import TextArea from '../components/TextArea.tsx';
import { useNavigate } from 'react-router-dom';

const Interpretation = () => {
    useKeyboardAvoider();
    const [prompt, setPrompt] = useState<string>('');

    const navigate = useNavigate();

    const promptHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
        console.log(prompt);
    };

    const buttonClickHandler = () => {
        navigate('/loading', { state: { prompt } });
    };


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
                <TextArea
                    placeholder='꿈을 입력하라냥'
                    onChange={promptHandler}
                    height='200px'
                    width='345px'
                    fontSize='18px'
                />
                <div className='interpretation-button-area'>
                    <BirthDaySelect />
                    <Button name='완료' mode='result' draggable={true} onClick={buttonClickHandler} />
                </div>
            </div>
        </div>
    );
};

export default Interpretation;