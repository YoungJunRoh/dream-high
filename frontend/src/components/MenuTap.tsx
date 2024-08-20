import React, { useState } from 'react';
import styled from 'styled-components';
import '../styles/global.css';
import '../styles/mypage.css';
import ProfileImg from '../components/ProfileImg.tsx';
import { Link } from 'react-router-dom';

// Modal Container
export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

// 모달 뒷 배경
export const ModalBackdrop = styled.div`
  position: fixed;
  width: 375px;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);

  @media all and (max-width:430px) {
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  }
`;

// 모달
export const ModalView = styled.div.attrs(() => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: 'dialog',
}))`
  // TODO : Modal창 CSS를 구현합니다.
  // top: 472px;
  top: 50%;
  left: 238px;
  transform: translate(-50%, -50%);
  width: 275px;
  height: 100%;
  background-color: #BAA9C1;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  @media all and (max-width:430px) {
    // TODO : Modal창 CSS를 구현합니다.
    top: 50%;
    left: 65%;
    transform: translate(-50%, -50%);
    width: 70vw;
    height: 100%;
    background-color: #BAA9C1;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
`;

export const MenuTap = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 로그인 처리 커스텀 하삼.
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const openModalHandler = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const closeModalHandler = () => {
    setIsOpen(false);
  }

  const name: string = '강룰루';

  if (isLogin) {
    return (
      <>
        <ModalContainer>
          <div
            id='menu-tap'
            className='draggable'
            onClick={openModalHandler}
          />
          {isOpen ? (
            <ModalBackdrop onClick={openModalHandler}>
              <ModalView onClick={(event) => event.stopPropagation()}>
                <div id='menu-container'>
                  <div></div>
                  <ProfileImg login={isLogin}></ProfileImg>
                  <span
                    id='menu-profile-name'
                    className='font-extrabold'
                  >
                    {name}<span> 이다냥🐱</span></span>
                  <div className='menu-line-bold'></div>
                  <Link
                    to='/mypage'
                    onClick={closeModalHandler}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className='menu-content font-bold'>마이페이지</div>
                  </Link>
                  <div className='menu-content font-bold'>게시판 보러가기</div>
                  <div className='menu-content font-bold'>로그아웃</div>
                </div>
              </ModalView>
            </ModalBackdrop>
          ) : null}
        </ModalContainer>
      </>
    );
  } else {
    return (
      <>
        <ModalContainer>
          <div
            id='menu-tap'
            className='draggable'
            onClick={openModalHandler}
          />
          {isOpen ? (
            <ModalBackdrop onClick={openModalHandler}>
              <ModalView onClick={(event) => event.stopPropagation()}>
                <div id='menu-container'>
                  <div></div>
                  <Link
                    to='/login-home'
                    onClick={closeModalHandler}
                  >
                    <ProfileImg login={isLogin}></ProfileImg>
                  </Link>
                  <span
                    id='menu-profile-name'
                    className='font-extrabold'
                  >로그인 하라냥🐱</span>
                  <div className='menu-line-bold'></div>
                  <Link
                    to='/login-home'
                    onClick={closeModalHandler}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className='menu-content font-bold'>마이페이지</div>
                  </Link>
                  <div className='menu-content font-bold'>게시판 보러가기</div>
                  <div className='menu-content font-bold'>로그아웃</div>
                </div>
              </ModalView>
            </ModalBackdrop>
          ) : null}
        </ModalContainer>
      </>
    );
  }




};
