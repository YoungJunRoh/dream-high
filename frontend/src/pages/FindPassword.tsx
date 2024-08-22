import React from 'react';
import ResultSmallBox from '../components/SmallBox.tsx';
import ResultBigBox from '../components/BigBox.tsx';
import TextArea from '../components/TextArea.tsx';
import '../styles/login.css';
import Button from '../components/Button.tsx';




function FindPassword() {
    return (
        <div className='login-background'>
            <ResultSmallBox name='비밀번호 재설정하라냥🐾' mode='findbox' />
            <ResultBigBox mode='loginbox'>
            <div className='login-input'>
                    <h5>이메일</h5>
                    <TextArea
                        placeholder='이메일을 입력하세요'
                        m_height='15vw'
                        m_width='85vw'
                        m_fontSize='20px'
                        w_height='15vw'
                        w_width='85vw'
                        w_fontSize='20px'
                    ></TextArea>
                </div>
            </ResultBigBox>

            <Button name='완료다냥🐾' mode='login' />
        </div>
    );
  }
  
  export default FindPassword;