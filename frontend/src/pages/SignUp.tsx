import React, { useState } from 'react';
import ResultSmallBox from '../components/SmallBox.tsx';
import ResultBigBox from '../components/BigBox.tsx';
import TextArea from '../components/TextArea.tsx';
import '../styles/login.css';
import Button from '../components/Button.tsx';
import TermsModal from '../components/TermsModal.tsx';
import '../styles/terms.css';
import { useNavigate } from 'react-router-dom'; // react-router-dom을 사용하여 페이지 이동

function SignUp() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false); // 동의 상태 관리
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 객체

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAgree = () => {
        setIsAgreed(true); // 동의 상태를 true로 설정
        console.log('이용약관에 동의했습니다.');
    };

    const handleComplete = () => {
        if (isAgreed) {
            // 동의한 경우에만 로그인 창으로 이동
            navigate('/login'); // 로그인 페이지로 이동하는 경로
        } else {
            alert('이용약관에 동의해야 합니다.'); // 동의하지 않았을 경우 경고
        }
    };

    return (
        <div className='login-background'>
            <ResultSmallBox name='입력하라냥🐾' mode='findbox' />
            <ResultBigBox mode='signupbox'>
                <h3>회원가입🐾</h3>
                <div className='login-input'>
                    <h5>닉네임</h5>
                    <TextArea
                        placeholder='닉네임을 입력하세요'
                        height='15vw'
                        width='85vw'
                        fontSize='20px'
                    />
                </div>
                <div className='login-input'>
                    <h5>이메일 중복</h5>
                    <TextArea
                        placeholder='이메일을 입력하세요'
                        height='15vw'
                        width='85vw'
                        fontSize='20px'
                    />
                </div>
                <div className='login-input'>
                    <h5>이메일 인증</h5>
                    <TextArea
                        placeholder='이메일을 재입력 입력하세요'
                        height='15vw'
                        width='85vw'
                        fontSize='20px'
                    />
                </div>
                <div className='login-input'>
                    <h5>비밀번호입력</h5>
                    <TextArea
                        placeholder='비밀번호를 입력하세요'
                        height='15vw'
                        width='85vw'
                        fontSize='20px'
                    />
                </div>
                <div className='login-input'>
                    <h5>비밀번호확인</h5>
                    <TextArea
                        placeholder='비밀번호를 재입력 입력하세요'
                        height='15vw'
                        width='85vw'
                        fontSize='20px'
                    />
                </div>
                <div className='button-gradient'>
                    <button onClick={handleOpenModal}>이용약관 보기</button>
                    
                </div>
            </ResultBigBox>

            <Button name='완료다냥🐾' mode='login' onClick={handleComplete} />
            {isModalOpen && (
                <TermsModal onClose={handleCloseModal} onAgree={handleAgree} />
            )}
            
        </div>
    );
}

export default SignUp;