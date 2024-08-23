import React, { useEffect } from 'react';
import '../styles/board.css';
import '../styles/global.css';
import TextArea from './TextArea.tsx';

const SearchBar = () => {
    return (
        <div id='searchbar' className='font-normal'>
            <TextArea
                placeholder='검색어를 입력하라냥'
                m_height = '50px'
                m_width = '70vw'
                m_fontSize = '20px'
                w_height = '50px'
                w_width = '270px'
                w_fontSize = '20px'
            />
        </div>
    );
};

export default SearchBar;
