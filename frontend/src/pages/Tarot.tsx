import React from 'react';
import TarotDeck from '../components/TarotDeck.tsx';
import '../styles/tarot.css';

const TarotPage: React.FC = () => {
    return (
        <div className='tarot-page'>
            <h2 className='font-bold'>타로 기능</h2>
            <TarotDeck />
        </div>
    );
};

export default TarotPage;
