import React, { ChangeEvent, useEffect, useState } from "react";
import { CommentsResponse } from '../interfaces/dream.ts';
import { getComments } from '../services/DreamService.ts';
import { useMember } from "../hooks/MemberManager.tsx";
import CommentForm from "./CommentForm.tsx";
import { AxiosRequestConfig } from "axios";
import CommentInput from "./CommentInput.tsx";
import styled from "styled-components";
import '../styles/global.css';
import useReload from "../hooks/useReload .tsx";

type CommentProp = {
    dreamId: number
}

const PageInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 40px;
    width: 100%;
`;

const PageNumberArea = styled.h3`
    margin-left: 20px;
    margin-right: 20px;
`;

const Comment: React.FC<CommentProp> = ({ dreamId }) => {
    const { authorization } = useMember();
    const accessToken: AxiosRequestConfig = {
        headers: {
            Authorization: authorization,
        },
    };

    const [response, setResponse] = useState<CommentsResponse | null>(null);
    const [page, setPage] = useState<number>(1);
    const getCommentsAsync = async () => {
        setResponse((await getComments(dreamId, 1, 10)).data);
    }

    const currentPage: number = response?.pageInfo.totalPages as number;
    const size: number = 10;
    const pageUp = async () => {
        if (page < currentPage+1) {
            setPage(page + 1);
            setResponse((await getComments(dreamId, page, size)).data);
        }
    }

    const pageDown = async () => {
        if (page > 1) {
            setPage(page - 1);
            setResponse((await getComments(dreamId, page, size)).data);
        }
    }

    const PageInfo = () => {
        return (
            <PageInfoContainer>
                <h3 onClick={pageDown}>◀</h3>
                <PageNumberArea> {page} </PageNumberArea>
                <h3 onClick={pageUp}>▶</h3>
            </PageInfoContainer>
        );
    }


    useEffect(() => {
        getCommentsAsync();
    }, []);

    return (
        <React.Fragment>
            {response?.data.map((data) => (
                <CommentForm
                    username={data.nickName as string}
                    dateTime={data.createdAt as string}
                    content={data.content as string}
                ></CommentForm>))}
            <CommentInput
                dreamId={dreamId}
                accessToken={accessToken}
            />
            <PageInfo/>
        </React.Fragment>
    );
};

export default Comment;