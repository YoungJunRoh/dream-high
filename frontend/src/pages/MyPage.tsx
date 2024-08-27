import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/global.css';
import '../styles/mypage.css'; // 마이페이지 스타일
import { useProfile } from '../components/ProfileContext.tsx'; // 프로필 컨텍스트
import { getMember } from '../services/MemberService.ts'; // 사용자 정보 API
import { useMember } from '../hooks/MemberManager.tsx'; // 회원 정보를 관리하는 훅
import Stamp from '../components/Stamp.tsx'; // Stamp 컴포넌트
import { memberApiResponse } from '../interfaces/member.ts';
import styled from 'styled-components';
import background from '../assets/img-background-night.png';
import defaultProfile from '../assets/img-non-login.png';
import BoardIndex from '../components/BoardIndex.tsx';
import BoardList from '../components/BoardList.tsx';
import { AxiosRequestConfig } from 'axios';
import { stat } from 'fs';

type PictureList = {
    pictureDate: memberApiResponse;
}

interface LocationState {
    pictures: [];
}

const MyPageContainer = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${background});
    background-size: 100%;
    background-color: #340C62;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    color: black;
    align-items: center;
`;

const ContentArea = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 90%;
    background-color: rgba(140, 68, 124, 0.8);
    background-repeat: no-repeat;
    margin: 10px;
    color: white;
    border-radius: 10px;
`;

const ContentArea_col = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 90%;
    background-color: rgba(140, 68, 124, 0.8);
    background-repeat: no-repeat;
    margin: 10px;
    color: white;
    border-radius: 10px;
`;

const Title = styled.h5`
    padding-left: 10px;
    padding-top: 10px;
`;

const ProfileImgArea = styled.div`
    padding: 20px;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    top: 25px;
`;

type AccessToken = {
    accessToken: AxiosRequestConfig;
}

const MyPage = () => {
    const [responseMember, setResponseMember] = useState<memberApiResponse | null>(null); // 사용자 정보 상태
    const [stampCount, setStampCount] = useState<number>(0); // 스탬프 개수 상태
    const [accessToken, setAccessToken] = useState<AxiosRequestConfig | null>(null);
    const navigation = useNavigate();
    const location = useLocation();

    // 컴포넌트가 마운트될 때 사용자 정보 가져오기
    useEffect(() => {
        const state: AccessToken = location.state;
        
        setAccessToken(state.accessToken);

        const getMemberAsync = async () => {
            const response = await getMember(state.accessToken); // API 호출
            setResponseMember(response.data); // 사용자 정보 상태 업데이트
        }
        getMemberAsync(); // API 호출
    }, []);
    
    // 스탬프 개수를 증가시키는 함수
    const addStamp = () => {
        setStampCount((prevCount) => prevCount + 1); // 스탬프 개수 증가
    };

    const pictures: [] = responseMember?.data.pictures as [];    // 서연
    const email: string = responseMember?.data.email as string;
    const name: string = responseMember?.data.nickName as string;
    const memberId: number = responseMember?.data.memberId as number;
    const memberStatus: string = responseMember?.data.memberStatus as string;

    const changeMyProfile = () => {
        navigation('/member-modification', { state: { email, name, accessToken, memberId, memberStatus } })
    }

    const changeProfileImg = () => {
        // TODO: 프로파일 이미지 변경하는 링크로 이동
        // navigation 사용, 스테이트 넘기기
        navigation('/mycollection', { state: { pictures, accessToken, memberId } })
    }

    const profileUrl: string | null = responseMember?.data.profileUrl as string | null;

    return (
        <MyPageContainer>
            <ContentArea className='font-extrabold'>
                <ProfileImgArea>
                    <img
                        src={profileUrl ? profileUrl : defaultProfile}
                        width='150px'
                        onClick={changeProfileImg}  // 서연
                    ></img>
                </ProfileImgArea>
                <UserInfo className='font-bold'>
                    <h4>'{name}'</h4>
                    <p className='font-normal'>님 환영한다냥~</p> {/* 사용자 닉네임 */}
                    <p onClick={changeMyProfile}>회원정보 수정</p>
                </UserInfo>
            </ContentArea>
            <Link to={'/memberModification'}>
            </Link>
            <ContentArea_col>
                <Title
                    className='font-bold'
                >스탬프</Title>
                <Stamp count={stampCount} /> {/* 현재 스탬프 개수를 전달 */}
            </ContentArea_col>
            <ContentArea_col>
                <Title>
                    나의 꿈해몽🐾
                </Title>
                <BoardIndex />
                {responseMember?.data.dreams.map((data) => (<BoardList contentData={data}></BoardList>))}
            </ContentArea_col>

        </MyPageContainer>
    );
};

export default MyPage; // MyPage 컴포넌트 내보내기