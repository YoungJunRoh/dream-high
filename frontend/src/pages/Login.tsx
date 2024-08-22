import React, { useState } from 'react';
import '../styles/login.css';
import ResultBigBox from '../components/BigBox.tsx';
import ResultSmallBox from '../components/SmallBox.tsx';
import Button from '../components/Button.tsx';
import TextArea from '../components/TextArea.tsx';
import { AxiosResponse } from 'axios';

const Login = () => {
    const [response, setResponse] = useState<AxiosResponse | null>(null);
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const emailHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEmail(e.target.value);
        console.log(email);
    }

    const passwordHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPassword(e.target.value);
        console.log(password);
    }


    return (
        <div className='login-background'>
            <ResultSmallBox name='로그인이다 냥🐾' mode='loginbox' />
            <ResultBigBox mode='loginbox'>
                <div className='login-input'>
                    <h5>이메일</h5>
                    <TextArea
                        onChange={emailHandler}
                        placeholder='아이디를 입력하세요'
                        m_height='15vw'
                        m_width='85vw'
                        m_fontSize='20px'
                        w_height='56px'
                        w_width='320px'
                        w_fontSize='20px'
                    ></TextArea>
                </div>
                <div className='login-input'>
                    <h5>비밀번호</h5>
                    <TextArea
                        onChange={passwordHandler}
                        placeholder='비밀번호를 입력하세요'
                        m_height='15vw'
                        m_width='85vw'
                        m_fontSize='20px'
                        w_height='56px'
                        w_width='320px'
                        w_fontSize='20px'
                    ></TextArea>
                </div>
            </ResultBigBox>
            <Button
                name='로그인🐾'
                mode='login'
                draggable={true}
            >
            </Button>
            <Button
                name='SNS로그인'
                mode='pass'
                option='modal'
                draggable={true}
            >
            </Button>
            <Button
                name='회원가입'
                mode='pass'
                draggable={true}>
            </Button>
            <Button
                name='비밀번호 찾기'
                mode='pass'
                draggable={true}>
            </Button>

        </div>
    );
}

export default Login;