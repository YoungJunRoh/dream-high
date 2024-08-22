import React, { useState } from 'react';
import '../styles/global.css';
import '../styles/mypage.css';
import LongPress from '../components/LongPress.tsx';

function MyPage() {
    const [coupon, setCoupon] = useState<number>(2);

    // 1. 컴포넌트 

    return (
        <div id='mypage-backgound-night'>
            <div id='mypage-container' >
                <div id='mypage-profile-container' className='font-extrabold'>
                    <div id='mypage-profile' className='font-extrabold'>
                            <LongPress></LongPress>
                        <p id='nickname'>강룰루</p>
                    </div>

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
                    리스트입니다
                </div>
            </div>
        </div>
    );
}

export default MyPage;