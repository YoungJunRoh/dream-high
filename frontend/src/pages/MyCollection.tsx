import React, { useState } from 'react';
import '../styles/global.css';
import '../styles/getpicture.css';
import styled, { css } from "styled-components";
import Swal from 'sweetalert2';
import { useProfile } from '../components/ProfileContext.tsx'; // Context 가져오기
import { useLocation } from 'react-router-dom';


const ImageItem = styled.img`
    flex: 0 0 21%; /* 기본적으로 4개 이미지를 한 줄에 배치 (5% 여유 포함) */
    margin: 5px; /* 이미지 간 여백 */
    max-width: 60%; /* 부모 컨테이너의 너비에 맞추기 */
    max-height: 113px; /* 최대 높이 설정 */
    object-fit: cover; /* 이미지 비율 유지하며 크기 조절 */
    cursor: pointer; /* 이미지에 포인터 커서 추가 */
`;

const ImageContainer = styled.div`
    display: flex; /* Flexbox로 이미지 배치 */
    flex-wrap: wrap; /* 이미지가 자동으로 줄바꿈되도록 설정 */
    justify-content: center; /* 중앙 정렬 */
    align-items: flex-start; /* 수직 정렬을 상단 기준으로 설정 */
    padding: 10px; /* 패딩 추가 */
    border: 1px solid #ccc; /* 필요에 따라 테두리 추가 */
    border-radius: 8px; /* 필요에 따라 모서리 둥글게 만들기 */
`;

const images = [
    require('../assets/collect06.jpg'),
    require('../assets/collect01.png'),
    require('../assets/collect02.png'),
    require('../assets/collect03.png'),
    require('../assets/collect07.jpg'),
    require('../assets/image-rulru02.png'),
    require('../assets/collect05.jpg')

];

type PictureState = {
    pictures: [];
}

function MyCollection() {
    const { profileImage, setProfileImage } = useProfile(); 
    const [imageList, setImageList] = useState(images); // 이미지 상태 관리

    const handleImageClick = (index) => {
        const currentSrc = imageList[index];

        Swal.fire({
            title: '사진을 변경할꺼냥?',
            text: '컬렉션 중 이미지를 선택하라냥!',
            input: 'select', // 파일 입력
            inputOptions: {
                [currentSrc]: '현재 이미지', // 현재 이미지를 옵션에 추가
                ...imageList.reduce((acc, img) => {
                    if (img !== currentSrc) {
                        acc[img] = img; // 현재 이미지를 제외한 나머지 이미지를 옵션에 추가
                    }
                    return acc;
                }, {})
            },
            showCancelButton: true,
            confirmButtonText: '변경',
            cancelButtonText: '취소',
            preConfirm: (selectedImage) => {
                const newImages = [...imageList];
                newImages[index] = selectedImage; // 선택한 이미지로 업데이트
                setImageList(newImages);
                  setProfileImage(selectedImage); // 선택한 이미지를 프로필 이미지로 설정
            }
        });
    };

    const location = useLocation();
    const state = location.state as PictureState | null;
    const pictures:[] = state?.pictures as [];

    return (
        <div className='background'>
            <div className='collectionbox'>
                <h2>내 컬렉션</h2>
                <ImageContainer>
                    {pictures.map((url) => (
                        <ImageItem src={url} 
                        // onClick={() => handleImageClick()} // 이미지 클릭 시 핸들러 호출
                        />
                    ))}
                </ImageContainer>
            </div>
        </div>
    );
}
export default MyCollection;