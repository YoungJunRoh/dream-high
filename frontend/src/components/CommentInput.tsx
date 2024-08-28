import React, { useEffect, useState } from 'react';
import '../styles/global.css';
import Input from './Input.tsx';
import Button from './Button.tsx';
import styled from 'styled-components';
import { postComment } from '../services/DreamService.ts';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useMember } from '../hooks/MemberManager.tsx';
import Swal from 'sweetalert2';

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
    const {login} = useMember();

    const createComment = async () => {
        if (content.length < 5) {
            Swal.fire({
                icon: 'error',
                title: '글자 수 제한!😿',
                text: '5글자 이상 입력하라냥~🐾',
                confirmButtonText: '알겠다냥!'
            })
            return;
        }
        if(login){
            const response = await postComment(dreamId, content, accessToken);
            setResponse(response);
        }else{
            Swal.fire({
                icon: 'error',
                title: '로그인 하라냥😿',
                text: '로그인 안 한 집사는 이용 못 한다냥!🐾',
                confirmButtonText: '알겠다냥!'
            })
        }
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    // useEffect(() => {
    //     if (response) {
    //       window.location.reload(); // 새로고침
    //     }
    //   }, [response]); // shouldReload 상태가 변경될 때마다 실행

    return (
        <Container>
            <Input
                $m_height='50px'
                $m_width='100%'
                $m_fontSize='18px'
                $w_height='50px'
                $w_width='100%'
                $w_fontSize='18px'
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