import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDream } from '../services/DreamService.ts';
import { GetApiResponse } from '../interfaces/dream.ts';
import Swal from 'sweetalert2';
import BoardContent from '../components/BoardContent.tsx';
import '../styles/board.css';

const BoardDetails = () => {
    const params = useParams();
    const dreamId: number = parseInt(params.id as string);
    const [response, setResponse] = useState<GetApiResponse | null>(null);

    useEffect(() => {
        const getDreamAsync = async () => {
            try {
                const response = await getDream(dreamId);
                setResponse(response);
            } catch (error) {
                console.error('Failed to fetch dream data:', error);
            }
        };

        getDreamAsync();
    }, [dreamId]);

    // 데이터가 아직 로딩되지 않았을 때 로딩 상태를 표시하거나 예외 처리
    if (!response) {
        return <div>Loading...</div>;
    }

    if (response.data.status === 404) {
        Swal.fire({
            text: '존재하지 않는 게시판입니다.'
        });
        return null; // 알림 후 아무것도 렌더링하지 않음
    }

    const data = response.data.data;
    const interpretationResponse = data?.interpretationResponse;

    const name: string = '고양꿈꿨어';
    const createdAt: string = data?.createdAt as string;
    const viewCnt: number = data?.viewCount as number;
    const likeCnt: number = data?.likeCount as number;
    const advice: string = interpretationResponse?.advice as string;
    const interpertaionKeyword = interpretationResponse?.keyword[0];
    const summary: string = interpretationResponse?.summary as string;
    const dreamContent: string = data?.content as string;
    const interpertaionContent: string = interpretationResponse?.content as string;

    const BoardDetail = () => (
        <div>
            <div className='board-detail-title font-normal'>
                <h2 className='font-extrabold'>{name} 님의 해몽 결과 🐾</h2>
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
        </div>
    );

    return (
        <div>
            <BoardDetail />
        </div>
    );
};

export default BoardDetails;
