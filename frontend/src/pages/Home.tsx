import React, { useEffect, useState } from 'react';
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
import { GetDreamsResponse } from '../interfaces/dreamsResponse.ts';
import HotDream from '../components/HotDream.tsx';

const Home = () => {
    const [responseDreams, setResponseDreams] = useState<GetDreamsResponse | null>(null);

    const getDreamsAsync = async () => {
        try {
            const result = await getDreams(1, 10);
            setResponseDreams(result);
        } catch (error) {
            console.error("에러: ", error);
            alert('gets 요청 실패');
        }
    }

    useEffect(() => {
        getDreamsAsync();
    }, [])

    const randomHotDream: number = Math.floor(Math.random() * 10);
    const randomTmiIdx: number = Math.floor(Math.random() * tmiDatas.length);

    const BoardLists = () => {

        return (
        <BoardList></BoardList>
        );
    }

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
                <HotDream>{responseDreams?.data[randomHotDream].content}</HotDream>
                <div className='another-dream font-extrabold'>다른꿈도 보러가기  ▼</div>
                <BoardIndex />
                <BoardLists />
                <BoardSeeMore />
                <Footer />
            </div>
        </div>
    );
};

export default Home;