import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDream } from '../services/DreamService.ts';
import { GetApiResponse } from '../interfaces/dream.ts';
import Swal from 'sweetalert2';
import BoardContent from '../components/BoardContent.tsx';
import '../styles/board.css';
import { OptionTab } from '../components/OptionTab.tsx';
import OptionContent from '../components/OptionContent.tsx';
import PostInfo from '../components/PostInfo.tsx';
import Footer from '../components/Footer.tsx';
import Comment from '../components/Comment.tsx';
import { AxiosRequestConfig } from "axios";
import { useMember } from '../hooks/MemberManager.tsx';


const BoardDetails = () => {
    const params = useParams();
    const dreamId: number = parseInt(params.id as string);
    const [response, setResponse] = useState<GetApiResponse | null>(null);

    const { authorization } = useMember();

    const accessToken: AxiosRequestConfig = {
        headers: {
            Authorization: authorization,
        },
    };

    const postRoleHandler = () => {
        console.log("onclick");
    }

    const deleteHandler = () => {
    }

    const likeHandler = () => {
    }

    useEffect(() => {
        const getDreamAsync = async () => {
            const response = await getDream(dreamId, accessToken);
            setResponse(response.data);
        };

        getDreamAsync();
    }, [dreamId]);

    // 데이터가 아직 로딩되지 않았을 때 로딩 상태를 표시하거나 예외 처리
    if (!response) {
        return <div>Loading...</div>;
    }

    if (response.status === 404) {
        Swal.fire({
            text: '존재하지 않는 게시판입니다.'
        });
        return null; // 알림 후 아무것도 렌더링하지 않음
    }

    const data = response.data;
    const interpretationResponse = data?.interpretationResponse;

    const name: string = '고양꿈꿨어';
    const createdAt: string = data?.createdAt as string;
    const viewCnt: number = data?.viewCount as number;
    const likeCnt: number = data?.likeCount as number;
    const advice: string = interpretationResponse?.advice as string;
    const interpertaionKeyword: object = interpretationResponse?.keyword as object;
    const summary: string = interpretationResponse?.summary as string;
    const dreamContent: string = data?.content as string;
    const interpertaionContent: string = interpretationResponse?.content as string;

    return (
        <div>
            <div className='board-detail-title font-normal'>
                <div id='board-title'>
                    <h4 className='font-extrabold title-string'>{name} 님의 해몽 결과 🐾</h4>
                    <OptionTab>
                        <OptionContent
                            onClick={postRoleHandler}
                        >
                            공개범위 설정
                        </OptionContent>
                        <OptionContent
                            onClick={likeHandler}
                        >
                            좋아요
                        </OptionContent>
                        <OptionContent
                            onClick={deleteHandler}
                        >
                            삭제
                        </OptionContent>
                    </OptionTab>
                </div>
                <p>생성일 : {createdAt}</p>
                <p>조회수 : {viewCnt}</p>
            </div>
            <BoardContent
                advice={advice}
                interpertaionKeyword={interpertaionKeyword}
                summary={summary}
                dreamContent={dreamContent}
                interpertaionContent={interpertaionContent}
                boardId={dreamId}
                username={name}
            />
            <PostInfo />
            <Comment />
            <Footer />
        </div>
    );
};

export default BoardDetails;
