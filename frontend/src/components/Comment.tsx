import React, { useEffect, useState } from 'react';
import '../styles/global.css';
import styled from 'styled-components';
import { OptionTab } from './OptionTab';
import OptionContent from './OptionTabContent';
import { useMember } from '../hooks/MemberManager';



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
    justify-content: space-between;
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

const EditContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Input = styled.input`
    width: 70%;
`;

const Button = styled.button`
    width: 30%;
`;

type CommentProps = {
    username: string;
    dateTime: string;
    content: string;
}

const Comment: React.FC<CommentProps> = ({ username, dateTime, content }) => {
    const { login, authorization } = useMember();
    const [edit, setEdit] = useState<boolean>(false);
    const [currentContent, setContent] = useState<string>('');

    useEffect(()=>{
        setContent(content);
    }, [])
    const setEditHandler = () => {
        setEdit(true);
    }

    const updateComment = () => {

    }

    return (
        <CommentForm>
            <ContentInfo>
                <div className='comment-name-space'>
                    <h5 className='font-extrabold'>{username}</h5>
                    <Date className='font-normal'>{dateTime}</Date>
                </div>
                <div className='comment-option'>
                    {login && <OptionTab>
                        <OptionContent
                            onClick={setEditHandler}
                        >
                            수정
                        </OptionContent>
                        <OptionContent>
                            삭제
                        </OptionContent>
                    </OptionTab>}
                </div>
            </ContentInfo>
            {edit ?
                <EditContainer>
                    <Input
                        value={currentContent}
                        // onChange={setContent(currentContent)}
                        ></Input>
                    <Button onClick={updateComment}>수정완료</Button>
                </EditContainer>
                :
                <Content className='font-normal'>
                    {content}
                </Content>}

        </CommentForm>
    );
}

export default Comment;