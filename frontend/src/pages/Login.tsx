import React from 'react';
import '../styles/login.css';
import ResultBigBox from '../components/BigBox.tsx';
import ResultSmallBox from '../components/SmallBox.tsx';
import Button from '../components/Button.tsx';
import TextArea from '../components/TextArea.tsx';

function Login() {
    return (
        <div className='login-background'>
            <ResultSmallBox name='로그인이다 냥🐾' mode='loginbox' />
            <ResultBigBox mode='loginbox'>
                <div className='login-input'>
                    <h5>아이디</h5>
                    <TextArea
                        placeholder='아이디를 입력하세요'
                        height='15vw'
                        width='85vw'
                        fontSize='20px'
                    ></TextArea>
                </div>
                <div className='login-input'>
                    <h5>비밀번호</h5>
                    <TextArea
                        placeholder='비밀번호를 입력하세요'
                        height='15vw'
                        width='85vw'
                        fontSize='20px'
                    ></TextArea>
                </div>
            </ResultBigBox>
            <Button
                name='로그인🐾'
                mode='login'
                draggable={true}></Button>
            <Button
                name='SNS로그인'
                mode='pass'
                draggable={true}>
            </Button>
            <Button
                name='회원가입'
                mode='pass'
                draggable={true}></Button>
            <Button
                name='비밀번호 찾기'
                mode='pass'
                draggable={true}></Button>
        </div>
    );
}

export default Login;