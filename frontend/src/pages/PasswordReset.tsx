import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { patchPassword } from '../services/MemberService.ts';
import '../styles/login.css';
import ResultSmallBox from '../components/SmallBox.tsx';
import ResultBigBox from '../components/BigBox.tsx';
import Button from '../components/Button.tsx';
import Input from '../components/Input.tsx';
import Footer from '../components/Footer.tsx';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

type MemberState = {
    memberId: number;
    accessToken: AxiosRequestConfig;
}

const PasswordReset = () => {
    const location = useLocation();
    const state: MemberState = location.state as MemberState;
    const navigate = useNavigate();
    
    const [password, setPassword] = useState<string>('');
    const [newpassword, setNewPassword] = useState<string>('');
    const [response, setResponse] = useState<AxiosResponse | null>(null);

    // 패스워드 추출
    const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    // 패스워드 추출
    const newPasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const memberId: number = state.memberId as number;
    const accessToken: AxiosRequestConfig = state.accessToken as AxiosRequestConfig;

    const changePasswordClickHandlerAsync = async () => {
        const response = await patchPassword(memberId, password as string, newpassword as string, accessToken);
        setResponse(response);
    }

    return (
        <div className='login-background'>
            <ResultSmallBox name='비밀번호 재설정하라냥🐾' mode='findbox' />
            <ResultBigBox mode='loginbox'>
                <div className='login-input'>
                    <h5>기존 비밀번호</h5>
                    <Input
                        onChange={passwordChangeHandler}
                        placeholder='기존비밀번호를 입력하라냥'
                        $m_height='15vw'
                        $m_width='85vw'
                        $m_fontSize='20px'
                        $w_height='56px'
                        $w_width='320px'
                        $w_fontSize='20px'
                    ></Input>
                </div>
                <div className='login-input'>
                    <h5>새로운 비밀번호 재입력</h5>
                    <Input
                        onChange={newPasswordChangeHandler}
                        placeholder='새로운 비밀번호를 입력하세요'
                        $m_height='15vw'
                        $m_width='85vw'
                        $m_fontSize='20px'
                        $w_height='56px'
                        $w_width='320px'
                        $w_fontSize='20px'
                    ></Input>
                </div>
            </ResultBigBox>
            <Button
                name='완료다냥🐾'
                mode='login'
                onClick={changePasswordClickHandlerAsync}
            />
            <div id='passwordblank' />
            <Footer />
        </div>
    );
}

export default PasswordReset;