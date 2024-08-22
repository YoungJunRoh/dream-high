import React from 'react';
import '../styles/global.css';
import '../styles/getpicture.css';
import styled, { css } from "styled-components";



// 스타일드 컴포넌트 정의
const ImageItem = styled.img`
    flex: 1 0 21%; /* 기본적으로 4개 이미지를 한 줄에 배치 (5% 여유 포함) */
    margin: 5px; /* 이미지 간 여백 */
    max-width: 70%;
    max-height: 70%;
    object-fit: cover; /* 이미지 비율 유지하며 크기 조절 */
`;

const ImageContainer = styled.div`
    display: flex; /* Flexbox로 이미지 배치 */
    flex-wrap: wrap; /* 이미지가 자동으로 줄바꿈되도록 설정 */
    justify-content: center; /* 중앙 정렬 */
    align-items: center; /* 수직 정렬 */
`;

const images = [      require('../assets/image-rulru03.png').default, "../assets/image-rulru02.png", "../assets/img-main-cat.png", "../assets/img-main-cat.png" ];

function MyCollection() {
    return (
        <div className='background'>
            <div className='collectionbox'>
                <h2>내 컬렉션</h2>
                <ImageContainer>
                    {images.map((src, index) => (
                        <ImageItem key={index} src={src} alt={`Image ${index + 1}`} />
                    ))}
                </ImageContainer>
            </div>
        </div>
    );
}
export default MyCollection;