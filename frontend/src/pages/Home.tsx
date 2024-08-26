import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/home.css';
import TodayTMI from '../components/TodayTMI.tsx';
import tmiDatas from '../static/tmiData.tsx';
import Button from '../components/Button.tsx';
import BoardIndex from '../components/BoardIndex.tsx';
import BoardList from '../components/BoardList.tsx';
import BoardSeeMore from '../components/BoardSeeMore.tsx';
import Footer from '../components/Footer.tsx';
import { getDreams } from '../services/DreamService.ts';
import { GetsApiResponse } from '../interfaces/dream.ts';
import HotDream from '../components/HotDream.tsx';
import { useHeaderMode } from '../hooks/HeaderManager.tsx';
import useReload from '../hooks/useReload .tsx';

const Home = () => {
    const { headerMode, setHeaderMode } = useHeaderMode();
    useReload();

    useEffect(() => {
        setHeaderMode('main');
    }, [])

    const [responseDreams, setResponseDreams] = useState<GetsApiResponse | null>(null);
    const getDreamsAsync = async () => {
            const response = await getDreams(1, 10);
            setResponseDreams(response.data);
    }

    useEffect(() => {
        getDreamsAsync();
    }, [])

    const totalElements = responseDreams?.pageInfo.totalElements as number;

    const datas: any[] = responseDreams?.data || [];
    const boards = datas.map((data) => (<BoardList contentData={data}></BoardList>))

    const hotDreamMaker = () => {
        if (responseDreams && totalElements > 0) {
            // totalElements가 10 이하인 경우에도 인덱스 범위 내에서 랜덤 선택
            const maxIndex = Math.min(totalElements, 10);
            const randomHotDream: number = Math.floor(Math.random() * maxIndex);
            return responseDreams?.data[randomHotDream].content;
        }
        return "데이터가 없습니다."; // fallback 메시지 또는 null
    };

    const randomTmiIdx: number = Math.floor(Math.random() * tmiDatas.length);

    return (
        <div className='background-night'>
            <div className='main-cat'>
                <TodayTMI
                    content={tmiDatas[randomTmiIdx]} />
                <Link to={'/interpretation'}>
                    <Button
                        name='start'
                        mode='main' />
                </Link>
                <div className='content-name-container'>
                    <span className='font-bold content-name'>이런 해몽도 있다냥 🐾</span>
                </div>
                <HotDream>{hotDreamMaker()}</HotDream>
                <div className='another-dream font-extrabold'>다른꿈도 보러가기  ▼</div>
                <BoardIndex />
                {boards}
                <Link to='/board'>
                    <BoardSeeMore />
                </Link>
                <Footer />
            </div>
        </div>
    );
};

export default Home;