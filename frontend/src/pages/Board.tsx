import React, { useEffect, useState } from 'react';
import { useHeaderMode } from '../hooks/HeaderManager.tsx';
import '../styles/board.css';
import SearchBar from '../components/SearchBar.tsx';
import Button from '../components/Button.tsx';
import BoardIndex from '../components/BoardIndex.tsx';
import BoardList from '../components/BoardList.tsx';
import { GetDreamsResponse } from '../interfaces/dream.ts';
import { getDreams } from '../services/DreamService.ts';
import Footer from '../components/Footer.tsx';

const PageName = () => {
    const { setHeaderMode } = useHeaderMode();
    useEffect(() => {
        setHeaderMode('board');
    }, [])

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

    const datas = responseDreams?.data || [];
    const boards = datas.map((data) => (<BoardList contentData={data}></BoardList>))

    return (
        <div className='background-night'>
            <div id='board-main'>
                <div id='board-searchzone'>
                    <SearchBar />
                    <div id='board-searchbtn'>
                        <Button
                            mode='search'
                            name='검색'
                        >
                        </Button>
                    </div>
                </div>
                <BoardIndex />
                {boards}
                <div className='board-footer'>
                    <Footer />
                </div>
            </div>
        </div>

    );
}

export default PageName;