import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import '../styles/login.css';
import ResultBigBox from '../components/BigBox.tsx';
import ResultSmallBox from '../components/SmallBox.tsx';
import Button from '../components/Button.tsx';
import TextArea from '../components/TextArea.tsx';
import { LoginResponse } from '../interfaces/member.ts'
import { postLogin } from '../services/MemberService.ts';
import { useAuth } from '../hooks/AuthProvider.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import Footer from '../components/Footer.tsx';


const Login = () => {
    const { authorization, refresh, login, setAuthorization, setRefresh, setLogin } = useAuth();
    // 전역적으로 토큰 저장

    const navigate = useNavigate();

    const [response, setResponse] = useState<AxiosResponse | null>(null);
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    // 이메일 추출
    const emailHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = e.target.value;
        setEmail(value);
       
    };


    // 키다운 이벤트로 이메일 입력 필터링
    const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const allowedKeys = /^[a-zA-Z0-9@._-]+$/;

        // 한글 및 허용되지 않은 키 입력 차단
        if (!allowedKeys.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
            e.preventDefault();
        }
    };

    // 패스워드 추출
    const passwordHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = e.target.value;

        // 입력된 값이 모두 별표로 표시되도록 함
        value = '*'.repeat(value.length);

        setPassword(value);
        
    };

     // Enter 키 입력 방지 함수
     const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 엔터키 입력으로 줄바꿈 방지
        }
    };

    // 로그인 처리
    const loginHandler = async () => {
        const response = await postLogin(email as string, password as string);
        setResponse(response);
        console.log("Logging in with:", { email, password });
    };

    if (response !== null) {
        setAuthorization(response.headers.authorization);
        setRefresh(response.headers.refresh);
        setLogin(true);
        navigate('/');
    }

    return (
        <div className='login-background'>
            <ResultSmallBox name='로그인이다 냥🐾' mode='loginbox' />
            <ResultBigBox mode='loginbox'>
                <div className='login-input'>
                    <h5>이메일</h5>
                    <TextArea
                        onChange={emailHandler}
                        onKeyDown={(e) => { handleKeyDown(e); handleEmailKeyDown(e); }}
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
                        onKeyDown={handleKeyDown}
                        placeholder='비밀번호를 입력하세요'
                        m_height='15vw'
                        m_width='85vw'
                        m_fontSize='20px'
                        w_height='56px'
                        w_width='320px'
                        w_fontSize='20px'
                        value={password}
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
            <Link to='/signup'>
                <Button
                    name='회원가입'
                    mode='pass'
                    draggable={true}>
                </Button>
            </Link>
            <Link to='/login-passwordfind'>
                <Button
                    name='비밀번호 찾기'
                    mode='pass'
                    draggable={true}>
                </Button>
            </Link>
            <div id='blank'></div>
            <Footer/>
        </div>
    );
}

export default Login;