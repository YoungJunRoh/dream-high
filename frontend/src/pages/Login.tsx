import React, { useState, createContext, useContext, ReactNode } from 'react';
import '../styles/login.css';
import ResultBigBox from '../components/BigBox.tsx';
import ResultSmallBox from '../components/SmallBox.tsx';
import Button from '../components/Button.tsx';
import TextArea from '../components/TextArea.tsx';
import { LoginResponse } from '../interfaces/login.ts'
import { postLogin } from '../services/LoginService.ts';
import { useAuth } from '../hooks/AuthProvider.tsx';

const Login = () => {
    const { authorization, refresh, login, setAuthorization, setRefresh, setLogin } = useAuth();
    // 전역적으로 토큰 저장

    const [response, setResponse] = useState<LoginResponse | null>(null);
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    // 이메일 추출
    const emailHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEmail(e.target.value);
        console.log(email);
    };

    // 패스워드 추출
    const passwordHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPassword(e.target.value);
        console.log(password);
    };

    // 로그인 처리
    const loginHandler = async () => {
        const response = await postLogin(email as string, password as string);
        setResponse(response);
    };

    if (response !== null) {
        setAuthorization(response.headers.authorization);
        setRefresh(response.headers.refresh);
    }

    if (authorization !== null) {
        setLogin(true);
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
                onClick={loginHandler}
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