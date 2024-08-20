import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/home.css';
import TodayTMI from '../components/TodayTMI.tsx';
import tmiDatas from '../static/tmiData.tsx';
import Button from '../components/Button.tsx';
import hotDreamDatas from '../static/hotDreamData.tsx';
import BoardIndex from '../components/BoardIndex.tsx';
<<<<<<< HEAD
=======
import BoardList from '../components/BoardList.tsx';
import BoardSeeMore from '../components/BoardSeeMore.tsx';
import Footer from '../components/Footer.tsx';
>>>>>>> 88a10867db9d473d62ae6ae2136becf42a433ae4

const Home = () => {
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
                <div className='content-box-hotdream'>
                    <div className='font-bold content-hotdream'>{hotDreamDatas[0].data.content}</div>
                    {/* API 요청해서 나온 Json 데이터를 배열에 저장해서 랜덤함수로 돌려서 사용하기*/}
                </div>
                <div className='another-dream font-extrabold'>다른꿈도 보러가기  ▼</div>
<<<<<<< HEAD
                <BoardIndex/>
=======
                <BoardIndex />
                <BoardList></BoardList>
                <BoardSeeMore />
                <Footer />
>>>>>>> 88a10867db9d473d62ae6ae2136becf42a433ae4
            </div>
        </div>
    );
};

export default Home;