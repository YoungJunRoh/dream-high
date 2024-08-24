import React, { useState, useRef } from 'react';
import ResultSmallBox from '../components/SmallBox.tsx';
import ResultBigBox from '../components/BigBox.tsx';
import TextArea from '../components/TextArea.tsx';
import '../styles/login.css';
import '../styles/terms.css';
import '../styles/global.css';
import Footer from '../components/Footer.tsx';
import Button from '../components/Button.tsx';
import TermsModal from '../components/TermsModal.tsx';
import { useNavigate } from 'react-router-dom'; // react-router-dom을 사용하여 페이지 이동\
import Timer from '../components/Timer.tsx';
import Swal from 'sweetalert2';
import { postMember, postEmail, postVerifyEmail } from '../services/MemberService.ts';
import { AxiosResponse } from 'axios';
import Input from '../components/Input.tsx';

const SignUp = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isAgreed, setIsAgreed] = useState<boolean>(false); // 동의 상태 관리
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 객체
    const [nickname, setNickname] = useState<string>('') // 닉네임 상태
    const [email, setEmail] = useState<string>('') // 이메일 상태
    const [password, setPassword] = useState<string>('') // 패스워드 상태
    const [repassword, setRepassword] = useState<string>('') // 패스워드 상태
    const [verificationCode, setVerificationCode] = useState<string>('') // 이메일 인증 번호 상태
    const [verifyComplete, setVerifyComplete] = useState<string>('') // 이메일 인증 완료 상태
    const [showVerification, setShowVerification] = useState<boolean>(false);  // 상태를 통해 UI를 조건부로 렌더링
    const [isTimer, setIsTimer] = useState<boolean>(false); // 재시작 타이머 상태
    const [resendEmail, setResendEmail] = useState<boolean>(false); // 이메일 재전송 상태
    const [postResponse, setPostResponse] = useState<AxiosResponse | null>(null); // 회원가입 완료 코드
    const [postEmailResponse, setPostEmailResponse] = useState<AxiosResponse | null>(null); // 이메일 인증 완료 코드

    // ================================= ↓ 회원가입 양식 상태 코드 ===================================
    const nicknameHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNickname(e.target.value);
        console.log(nickname);
    }
    const emailHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEmail(e.target.value);
        console.log(email);
    }
    const verifyCodeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setVerificationCode(e.target.value);
        console.log(verificationCode);
    }
    const passwordHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPassword(e.target.value);
        console.log(password);
    }
    const repasswordHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRepassword(e.target.value);
    }
    const handleAgree = () => {
        setIsAgreed(true); // 동의 상태를 true로 설정
        console.log('이용약관에 동의했습니다.');
    };

    // Task.Delay 같은 친구.
    const sleep = (time: number): Promise<void> => {
        return new Promise<void>((resolve) => setTimeout(() => {
            console.log("대기");
            resolve();
        }, time));
    }

    // ================================= ↓ 이메일 인증 API 요청 코드 ===================================
    const sendEmailAsync = async () => {
        try {
            console.log(email);
            const response = await postEmail(email);
        } catch {
            throw new Error('이메일 전송 에러');
        }
    }

    // ================================= ↓ 이메일 인증 확인 API 요청 코드 ===================================
    const matchCodeAsync = async () => {
        try {
            console.log('인증번호 확인');
            const response = await postVerifyEmail(email, verificationCode);
            console.log('API 응답 상태 코드:', response); // 응답 상태 코드 출력

            // 상태 코드가 200일 때만 성공 처리
            if (response && response.status === 200) {
                setPostEmailResponse(response);
                setShowVerification(false);
            } else {
                Swal.fire({ text: '잘못된 인증번호 입니다.' });
            }
        } catch (error: any) {
            // 에러 핸들링
            console.error('인증 코드 확인 중 오류:', error);
            Swal.fire({ text: '인증 코드 확인 중 오류가 발생했습니다. 다시 시도해주세요.' });
        }
    };

    // ================================= ↓ (임시) 비밀번호 Valid ===================================
    const verifyPassword = password === repassword ? '일치하다냥😻' : '틀리다냥😿';

    // ================================= ↓ 이메일 인증 컴포넌트 관련 코드 ===================================
    const EmailButton = () => {
        return (
            <Button
                name='이메일 인증'
                mode="normalButton"
                onClick={sendEmailModeAsync}
            />
        );
    };

    const sendEmailModeAsync = async () => {
        setIsTimer(true);
        setShowVerification(true);
        await sendEmailAsync();
    };

    const emailReSenderAsync = async () => {
        Swal.fire({ text: "이메일 재전송을 완료하였습니다. 이메일 재전송은 한 번만 가능합니다." })
        if (!resendEmail) {
            // 재전송 API
            setIsTimer(false);
            await sleep(1000);
            setIsTimer(true);
            await sendEmailAsync();
            console.log("이메일 재전송");
            setResendEmail(true);
        } else Swal.fire({ text: "이메일 재전송은 한 번만 가능합니다." });
    }

    // ================================= ↓ 약관 동의 관련 코드 ===================================
    const handleOpenModal = () => { // term 모달
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsTimer(true);
        setIsModalOpen(false);
    };

    const handleComplete = async () => {
        if (isAgreed) {
            try {
                // 동의한 경우에만 api 요청
                const response = await postMember(email, password, nickname);
                setPostResponse(response); // 응답을 상태에 설정

                if (response?.status === 201) { // 여기서 response를 직접 확인
                    Swal.fire({
                        text: '회원가입이 완료되었다냥😽',
                        icon: 'success',
                        consmButtonText: '확인'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/login-home'); // 성공적으로 이동
                        }
                    });
                } else {
                    // 에러 처리 (예: 400, 500 등)
                    alert('회원가입에 실패하였습니다. 다시 시도해 주세요.');
                }
            } catch (error) {
                // 네트워크 오류 또는 기타 예외 처리
                Swal.fire({
                    text: '이메일 중복이다옹ㅇㅅㅇ',
                    icon: 'error',
                    confirmButtonText: '다른아이디입력하러가기😽'
                });
            }
        } else {
            Swal.fire("이용약관에 동의해야 합니다.");
        }
    };

    // ================================= ↓ 뷰 ===================================
    return (
        <div className='login-background'>
            <ResultSmallBox name='회원가입🐾' mode='findbox' />
            <ResultBigBox mode='signupbox'>
                <div id='' className='font-extrabold'>
                    <div className='login-input'>
                        <div className='signup-validation'>
                            <h5>닉네임</h5>
                            {/* <span className='signup-validation-text font-extrabold'>중복된 닉네임 입니다.</span> */}
                        </div>
                        <Input
                            onChange={nicknameHandler}
                            placeholder='닉네임을 입력하세요'
                            m_height='15vw'
                            m_width='85vw'
                            m_fontSize='20px'
                            w_height='56px'
                            w_width='320px'
                            w_fontSize='20px'
                        >
                        </Input>
                    </div>
                    <div className='login-input'>
                        <h5>이메일</h5>
                        <Input
                            onChange={emailHandler}
                            placeholder='이메일을 입력하세요'
                            m_height='15vw'
                            m_width='85vw'
                            m_fontSize='20px'
                            w_height='56px'
                            w_width='320px'
                            w_fontSize='20px'
                            type='email'
                        />
                    </div>
                    <div className='login-input'>
                        <div className='signup-validation'>
                            <h5>비밀번호</h5>
                            <span className='signup-validation-text font-extrabold'>{verifyPassword}</span>
                        </div>
                        <Input
                            onChange={passwordHandler}
                            placeholder='비밀번호를 입력하세요'
                            m_height='15vw'
                            m_width='85vw'
                            m_fontSize='20px'
                            w_height='56px'
                            w_width='320px'
                            w_fontSize='20px'
                            type='password'
                        />
                    </div>
                    <div className='login-input'>
                        <div className='signup-validation'>
                            <h5>비밀번호 확인</h5>
                            <span className='signup-validation-text font-extrabold'>{verifyPassword}</span>
                        </div>
                        <Input
                            onChange={repasswordHandler}
                            placeholder='비밀번호를 재입력 입력하세요'
                            m_height='15vw'
                            m_width='85vw'
                            m_fontSize='20px'
                            w_height='56px'
                            w_width='320px'
                            w_fontSize='20px'
                            type='password'
                        />
                    </div>
                    {!showVerification && <EmailButton />}
                    {showVerification && (
                        <div className='login-input'>
                            <div className='signup-validation'>
                                <h5 className='email-margin'>이메일 인증번호</h5>
                                <div className='style-timer'>
                                    {isTimer && <Timer />}
                                </div>
                            </div>
                            <Input
                                onChange={verifyCodeHandler}
                                placeholder='인증번호를 입력해주세요.'
                                m_height='15vw'
                                m_width='85vw'
                                m_fontSize='20px'
                                w_height='56px'
                                w_width='320px'
                                w_fontSize='20px'
                                type='number'
                            />
                            <Button
                                mode='normalButton'
                                name='인증 완료'
                                onClick={matchCodeAsync}
                            />
                            <div className='blank'></div>
                            {!resendEmail && <Button
                                mode='normalButton'
                                name='이메일 재전송'
                                onClick={emailReSenderAsync}
                            />}
                        </div>
                    )}
                    <h5 className='h5'>이용약관 확인하라옹</h5>
                    <div className='cat-paw-button'>
                        <button onClick={handleOpenModal}>
                            <div className="paw"></div>
                            <div className="paw"></div>
                            <div className="paw"></div>
                            <div className="paw"></div>
                            <div className="paw"></div>
                        </button>
                    </div>
                </div>
            </ResultBigBox>
            <div id='signup-confirm'>
                <Button name='가입하러가자냥🐾' mode='login' onClick={handleComplete} />
            </div>
            {isModalOpen && (
                <TermsModal onClose={handleCloseModal} onAgree={handleAgree} />
            )}
            <Footer />
        </div>
    );
}

export default SignUp;