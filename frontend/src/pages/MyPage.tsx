import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/mypage.css'; // 마이페이지 스타일
import LongPress from '../components/LongPress.tsx';
import { useProfile } from '../components/ProfileContext.tsx'; // 프로필 컨텍스트
import { memberApiResponse } from '../interfaces/member.ts'; // 사용자 응답 타입
import { getMember } from '../services/MemberService.ts'; // 사용자 정보 API
import { useMember } from '../hooks/MemberManager.tsx'; // 회원 정보를 관리하는 훅
import Stamp from '../components/Stamp.tsx'; // Stamp 컴포넌트
import Footer from '../components/Footer.tsx'; // Footer 컴포넌트

const MyPage = () => {
    const { profileImage } = useProfile(); // 프로필 이미지 가져오기
    const { authorization } = useMember(); // 인증 정보 가져오기
    const [responseMember, setResponseMember] = useState<memberApiResponse | null>(null); // 사용자 정보 상태
    const [stampCount, setStampCount] = useState<number>(0); // 스탬프 개수 상태

    const accessToken = {
        headers: {
            Authorization: authorization, // 인증 헤더 설정
        },
    };
    
    // 사용자 정보를 가져오는 비동기 함수
    const getMemberAsync = async () => {

        const response = await getMember(accessToken); // API 호출
        setResponseMember(response.data); // 사용자 정보 상태 업데이트
        alert('회원 정보를 가져오는 데 실패했습니다.');
    }

    // 컴포넌트가 마운트될 때 사용자 정보 가져오기
    useEffect(() => {
        getMemberAsync(); // API 호출
    }, []);

    // 스탬프 개수를 증가시키는 함수
    const addStamp = () => {
        setStampCount((prevCount) => prevCount + 1); // 스탬프 개수 증가
    };

    return (
        <div id='mypage-background'>
            <div id='mypage-container'>
                <div id='mypage-profile-container' className='font-extrabold'>
                    <div id='mypage-profile' className='font-extrabold'>
                        {profileImage ? (
                            <LongPress>
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    style={{ width: '100px', height: '100px', borderRadius: '50%' }} // 이미지 스타일
                                />
                            </LongPress>
                        ) : (
                            <p>프로필 이미지가 없습니다.</p> // 이미지가 없는 경우 메시지
                        )}
                        <p id='nickname'>{responseMember?.nickName}</p> {/* 사용자 닉네임 */}
                    </div>
                    <Link to={'/memberModification'}>
                        <div id='button'>
                            수정하러가기🐾
                        </div>
                    </Link>
                </div>

                {/* Stamp 컴포넌트 사용 */}
                <div id='mypage-stamp-container' className='font-extrabold'>
                    <Stamp count={stampCount} /> {/* 현재 스탬프 개수를 전달 */}
                </div>

                <div id='mypage-recently-post-container'>
                    나의 꿈해몽🐾
                </div>

           

                <Footer /> {/* Footer 컴포넌트 */}
            </div>
        </div>
    );
};

export default MyPage; // MyPage 컴포넌트 내보내기
