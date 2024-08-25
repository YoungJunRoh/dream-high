import React from 'react';
import '../styles/global.css';
import styled from 'styled-components';
import { OptionTab } from './OptionTab';
import OptionContent from './OptionContent';

export const CommentForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #E2E2E2;
    margin-top: 2px;
    margin-bottom: 2px;
    padding: 4px;
    padding-top: 6px;
`;

export const ContentInfo = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 2em;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    padding-left: 20px;
    color: black;
    grid-template-columns: minmax(100px, max-content) 1fr;
`;

export const Date = styled.span`
    margin-left: 10px;
    font-size: 15px;
    color: #4d4d4d;
    position: relative;
    top: 2px;
`;

const Comment = () => {
    return (
        <CommentForm>
            <ContentInfo>
                <h5 className='font-extrabold'>유정균</h5>
                <Date className='font-normal'>08/14 09:02</Date>
                <OptionTab>
                    <OptionContent>
                        ddddadasdsadsad
                    </OptionContent>
                </OptionTab>
            </ContentInfo>
            <Content className='font-bold'>
                잘봤습니다.잘봤습니다.잘봤습니다.잘봤습니다.잘봤습니다.잘봤습니다.잘봤습니다.잘봤습니다.잘봤습니다.잘봤습니다.잘봤습니다.잘봤습니다.잘봤습니다.잘봤습니다.잘봤습니다.잘봤습니다.잘봤습니다.잘봤습니다.
            </Content>

        </CommentForm>
    );
}

export default Comment;