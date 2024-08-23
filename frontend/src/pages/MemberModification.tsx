import React from 'react';
import '../styles/login.css';
import ResultBigBox from '../components/BigBox.tsx';
import ResultSmallBox from '../components/SmallBox.tsx';
import Button from '../components/Button.tsx';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MemberModification = () => {
    const gohome = useNavigate();
    const handleLeave = () => {
        Swal.fire({
            title: '정말 탈퇴할꺼냥...?',
            text: '탈퇴 후에는 복구할 수 없다냥.....',
            imageUrl: require('../assets/img-leave.png'), // 이미지 경로를 설정합니다.
            imageWidth: 100, // 이미지 너비 설정
            imageHeight: 100, // 이미지 높이 설정
            imageAlt: '탈퇴 아이콘', // 이미지 설명 텍스트
            showCancelButton: true,
            confirmButtonText: '아니.....',
            cancelButtonText: '어..미안..',
        }).then((result) => {
            if (result.isConfirmed) {
                gohome('/');
            }
        });
    };
    return (
        <div className='login-background'>
            <ResultSmallBox name='회원정보다냥🐾' mode='loginbox' />
            <ResultBigBox mode='signupbox'>
                <div className='login-input'>
                    <h5>닉네임</h5>
                </div>
                <div className='login-input'>
                    <h5>이메일</h5>
                </div>
                <div className='login-input'>
                    <h5>비밀번호 변경할꺼냥?</h5>
                    <Link to={'/login-passwordfind'}>
                        <Button mode='modification' name='비밀번호 수정하러가기🐾'>
                        </Button>
                    </Link>
                </div>
                <div id='modification-margin'>
                    <h5 className='h5'>이용약관 확인하라옹</h5>
                </div>
                <div id='catpawbutton-margin'>
                    <div className='cat-paw-button'>
                        <button>
                            <div className="paw"></div>
                            <div className="paw"></div>
                            <div className="paw"></div>
                            <div className="paw"></div>
                            <div className="paw"></div>
                        </button>
                    </div>
                </div>
            </ResultBigBox>
            <Link to={'/mypage'}>
                <Button
                    name='수정완료다냥!🐾'
                    mode='login'
                    draggable={true}
                >
                </Button>
            </Link>
            <Button
                name='탈퇴->'
                mode='leave'
                draggable={true}
                onClick={handleLeave} // 클릭 시 handleLeave 함수 호출
            >
            </Button>
        </div>
    );
}

export default MemberModification;