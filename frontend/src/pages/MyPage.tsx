import React from 'react';
import '../styles/global.css';
import '../styles/mypage.css';
import LongPress from '../components/LongPress.tsx';
import { useProfile } from '../components/ProfileContext.tsx'; // Context 가져오기
import Button from '../components/Button.tsx';
import { Link } from 'react-router-dom';

const MyPage: React.FC = () => {
    const { profileImage } = useProfile(); // Context에서 프로필 이미지 가져오기

    return (
        <div id='mypage-backgound-night'>
            <div id='mypage-container'>
                <div id='mypage-profile-container' className='font-extrabold'>
                    <div id='mypage-profile' className='font-extrabold'>
                        {profileImage ? (
                            <LongPress>
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    style={{ width: '100px', height: '100px', borderRadius: '50%' }} // 이미지 스타일 추가
                                />
                            </LongPress>
                        ) : (
                            <p>프로필 이미지가 없습니다.</p> // 이미지가 없는 경우 메시지
                        )}
                        <p id='nickname'>강룰루</p>
                    </div>
                    <Link to={'/memberModification'}>
                        <div id='button'>
                            수정하러가기🐾
                        </div>
                    </Link>
                </div>
                <div id='mypage-stamp-container' className='font-extrabold'>
                    <div id='mypage-stamp'>
                        <div id='stamp' className='stamp'></div>
                        <div></div>
                        <div id='stamp' className='stamp'></div>
                        <div></div>
                        <div id='stamp' className='stamp'></div>
                    </div>
                    <div id='mypage-stamp'>
                        <div></div>
                        <div id='stamp' className='stamp'></div>
                        <div></div>
                        <div id='stamp' className='stamp'></div>
                        <div></div>
                    </div>
                </div>
                <div id='mypage-recently-post-container'>
                    나의 꿈해몽🐾
                </div>
            </div>
        </div>
    );
}

export default MyPage;
