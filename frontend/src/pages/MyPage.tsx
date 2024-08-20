import React from 'react';
import '../styles/global.css';
import '../styles/mypage.css';
import ProfileImg from '../components/ProfileImg.tsx';

function MyPage() {
    return (
        <div id='mypage-backgound-night'>
            <div id='mypage-profile-container' className='font-extrabold'>
                <div id='mypage-profile' className='font-extrabold'>
                    <ProfileImg></ProfileImg>
                    <p>강룰루</p>
                </div>

            </div>
            <div id='mypage-stamp-container'>
                <div id='mypage-stamp'>
                    스탬프
                    스탬프
                    스탬프
                    스탬프
                    스탬프
                </div>
                <div id='mypage-stamp'>
                    스탬프
                    스탬프
                    스탬프
                    스탬프
                    스탬프
                </div>
            </div>
            <div id='mypage-recently-post-container'></div>
        </div>
    );
}

export default MyPage;