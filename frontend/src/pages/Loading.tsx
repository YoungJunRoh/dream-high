import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';
import '../styles/loading.css';
import { postDream } from '../services/DreamService.ts';
import { useMember } from '../hooks/MemberManager.tsx';
import { AxiosRequestConfig } from 'axios';

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

    console.log(prompt);

    const [responseContent, setResponseContent] = useState<ApiResponse | null>(null);
    const { authorization } = useMember();

      // AxiosRequestConfig 타입 선언.
  const accessToken: AxiosRequestConfig = {
    headers: {
      Authorization: authorization,
    },
  };

    const postAsync = async () => {
            const response = await postDream(prompt, accessToken);
            setResponseContent(response.data);
    }

    useEffect(() => {
        postAsync();
    }, []);

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
    }else {
        console.log("123123213213123123123");
    }

    return (
        <div className='background'>
            <div className="stars"></div>
            <ClockLoader className='clock'
                color="#FEE500"
                loading
                size={100}
                speedMultiplier={2}
            />
            <div className="loading-text">
                <h2> 좀만 기다려달라 냥!🐾 </h2>
            </div>
        </div>
    );
}

export default Loading;