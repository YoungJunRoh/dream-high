import React from 'react';
import '../styles/login.css';
import ResultSmallBox from '../components/SmallBox.tsx';
import ResultBigBox from '../components/BigBox.tsx';
import Button from '../components/Button.tsx';
import TextArea from '../components/TextArea.tsx';




function PasswordReset() {
    return (
        <div className='login-background'>
            <ResultSmallBox name='비밀번호 재설정하라냥🐾' mode='findbox' />
            <ResultBigBox mode='loginbox'>
            <div className='login-input'>
                    <h5>비밀번호</h5>
                    <TextArea
                        placeholder='아이디를 입력하세요'
                        height='15vw'
                        width='85vw'
                        fontSize='20px'
                    ></TextArea>
                </div>
                <div className='login-input'>
                    <h5>비밀번호 재입력</h5>
                    <TextArea
                        placeholder='비밀번호를 입력하세요'
                        height='15vw'
                        width='85vw'
                        fontSize='20px'
                    ></TextArea>
                </div>
            </ResultBigBox>

            <Button name='완료다냥🐾' mode='login' />
        </div>
    );
}

export default PasswordReset;