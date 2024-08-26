import React, { useEffect, useState } from 'react';
import '../styles/global.css';
import Input from './Input.tsx';
import Button from './Button.tsx';
import styled from 'styled-components';
import { postComment } from '../services/DreamService.ts';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

type Comment = {
    dreamId: number;
    accessToken: AxiosRequestConfig;
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const CommentInput: React.FC<Comment> = ({dreamId, accessToken}) => {
    const [response, setResponse] = useState<AxiosResponse | null>(null);
    const [content, setContent] = useState<string>('');

    const createComment = async () => {
        const response = await postComment(dreamId, content, accessToken);
        setResponse(response);
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    useEffect(() => {
        if (response) {
          window.location.reload(); // 새로고침
        }
      }, [response]); // shouldReload 상태가 변경될 때마다 실행

    return (
        <Container>
            <Input
                m_height='50px'
                m_width='100%'
                m_fontSize='18px'
                w_height='50px'
                w_width='100%'
                w_fontSize='18px'
                onChange={onChangeHandler}
            >
            </Input >
            <Button
                mode='search'
                name='댓글등록'
                onClick={createComment}
            >
            </Button>
        </Container>
    );
}

export default CommentInput;