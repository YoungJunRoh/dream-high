import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDream } from '../services/DreamService.ts';
import { GetDreamResponse } from '../interfaces/dream.ts';
import Swal from 'sweetalert2';
import InterpretationResult from '../components/InterpretationResult.tsx';
import '../styles/board.css';

const BoardDetails = () => {
    const params = useParams();
    const dreamId: number = parseInt(params.id as string);
    const [response, setResponse] = useState<GetDreamResponse | null>(null);

    // 멤버 조회 API 추가 
    // 
    const getDreamAsync = async () => {
        const response = await getDream(dreamId);
        setResponse(response);
    }

    useEffect(() => {
        getDreamAsync();
    }, []);

    if (response?.StatusCode === 404) {
        Swal.fire({
            text: '존재하지 않는 게시판입니다.'
        })
    }

    const data = response?.data;
    const interpretationResponse = data?.interpretationResponse

    const name: string = '고양꿈꿨어';
    const createdAt: string = data?.createdAt as string;
    const viewCnt: number = data?.viewCount as number;
    const likeCnt: number = data?.likeCount as number;
    const advice: string = interpretationResponse?.advice as string;
    const interpertaionKeyword = interpretationResponse?.keyword[0];
    const summary: string = interpretationResponse?.summary as string;
    const dreamContent: string = data?.content as string;
    const interpertaionContent: string = interpretationResponse?.content as string;

    const BoardDetail = () => {
        return (
            <div>
                <div className='board-detail-title font-normal'>
                    <h2 className='font-extrabold'>{name} 님의 해몽 결과 🐾</h2>
                    <p>생성일 : {createdAt}</p>
                    <p>조회수 : {viewCnt}</p>
                </div>
                <InterpretationResult
                    advice={advice}
                    interpertaionKeyword={interpertaionKeyword}
                    summary={summary}
                    dreamContent={dreamContent}
                    interpertaionContent={interpertaionContent}
                />
            </div>
        );
    };

    return (
        <div>
            <BoardDetail></BoardDetail>
        </div>
    );
}

export default BoardDetails;
