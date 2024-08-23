import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import ResultSmallBox from '../components/SmallBox.tsx';
import ResultBigBox from '../components/BigBox.tsx';
import Button from '../components/Button.tsx';
import TextArea from '../components/TextArea.tsx';
import Footer from '../components/Footer.tsx';




function PasswordReset() {
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>();
    // 패스워드 추출
    const passwordHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPassword(e.target.value);
        console.log(password);
    };
    return (
        <div className='login-background'>
            <ResultSmallBox name='비밀번호 재설정하라냥🐾' mode='findbox' />
            <ResultBigBox mode='loginbox'>
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
                <div className='login-input'>
                    <h5>비밀번호 재입력</h5>
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
            <Button name='완료다냥🐾' mode='login' />
            <div id='passwordblank'/>
            <Footer/>
        </div>
    );
}

export default PasswordReset;