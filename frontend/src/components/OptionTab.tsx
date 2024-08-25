import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import '../styles/global.css';
import { useMember } from '../hooks/MemberManager.tsx';
import meatballs from '../assets/icon-meatballs-menu.png';

// 미트볼 메뉴
export const OptionTabButton = styled.div`
    width: 25px;
    height: 30px;
    background-image: url(${meatballs});
    background-repeat: no-repeat;
    position: relative;
    left: 12px;
    cursor: pointer;
    
    `;

// Modal Container
export const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;

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
  background: rgba(255, 255, 255, 0);
  overflow: hidden;

  @media all and (max-width:430px) {
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 9999;
  background: rgba(255, 255, 255, 0);
}
`;

// 모달
export const ModalView = styled.div.attrs(() => ({
    // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
    role: 'dialog',
}))`
  // TODO : Modal창 CSS를 구현합니다.
  // top: 472px;
  top: 6.5%;
  float: right;
  width: 140px;
  height: max-content;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media all and (max-width:430px) {
    // TODO : Modal창 CSS를 구현합니다.
    top: 7.6%;
    float: right;
    width: 140px;
    height: max-content;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

type Option = {
    children: ReactNode
}

export const OptionTab: React.FC<Option> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false); // 메뉴탭 상태
    const [isHost, setIsHost] = useState<boolean>(false); // 로그인 상태

    const openModalHandler = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            // document.body.style.overflow = "hidden";
        } else {
            // document.body.style.overflow = "unset";
        }
    };

    return (
        <>
            <ModalContainer>
                <OptionTabButton
                    onClick={openModalHandler}
                />
                {isOpen ? (
                    <ModalBackdrop
                        onClick={openModalHandler}
                    >
                        <ModalView onClick={(event) => event.stopPropagation()}>
                            <OptionContainer>
                                {children}
                            </OptionContainer>
                        </ModalView>
                    </ModalBackdrop>
                ) : null}
            </ModalContainer>
        </>
    );
};