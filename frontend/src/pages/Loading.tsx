import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/loading.css';
import { postDream } from '../services/DreamService.ts';
import MeteorEffect from '../components/MeteorEffect.tsx'; // MeteorEffect 컴포넌트 가져오기

// 인터페이스 정의
interface DreamKeyword {
    dreamKeywordId: number;
    name: string;
    dreamId: number;
}

interface InterpretationKeyword {
    interpretationMoodKeywordId: number;
    name: string;
}

interface InterpretationResponse {
    interpretationId: number;
    content: string;
    summary: string;
    advice: string;
    keyword: InterpretationKeyword;
}

interface DreamData {
    dreamId: number;
    memberId: number;
    content: string;
    dreamStatus: string;
    dreamSecret: string;
    createdAt: string;
    modifiedAt: string | null;
    dreamKeywords: DreamKeyword[];
    interpretationResponse: InterpretationResponse;
    comments: any[];
}

interface ApiResponse {
    data: DreamData;
}

type LocationState = {
    prompt: string;
}

const Loading = () => {
    const location = useLocation();
    const state = location.state as LocationState | null;
    const prompt = state?.prompt || '기본값';
    const navigate = useNavigate();

    const [responseContent, setResponseContent] = useState<ApiResponse | null>(null);

    const postAsync = async () => {
        const response = await postDream(prompt);
        setResponseContent(response.data);
    }

    useEffect(() => {
        postAsync();
    }, []);

    useEffect(() => {
        if (responseContent) {
            const interpretationResponse = responseContent.data.interpretationResponse;
            const advice = interpretationResponse.advice;
            const interpertaionKeyword = interpretationResponse.keyword;
            const summary = interpretationResponse.summary;
            const dreamContent = responseContent.data.content;
            const interpertaionContent = interpretationResponse.content;

            navigate('/interpretation-result', {
                state: { advice, interpertaionKeyword, summary, dreamContent, interpertaionContent }
            });
        }
    }, [responseContent, navigate]);

    return (
        <div id='background'>
            <MeteorEffect count={50} direction="right" angle={30} /> {/* MeteorEffect 추가 */}
            <div className="loading-text">
                <h2> 좀만 기다려달라 냥!🐾 </h2>
            </div>
        </div>
    );
}

export default Loading;
