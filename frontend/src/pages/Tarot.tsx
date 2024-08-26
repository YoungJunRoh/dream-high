import React, { useState } from 'react';
import TarotDeck from '../components/TarotDeck.tsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/tarot.css';

const TarotPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedCards, setSelectedCards] = useState<number[]>([]);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [tarotResult, setTarotResult] = useState<any>(null);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const handleCardSelect = (cardId: number) => {
        if (selectedCards.length < 3 && !selectedCards.includes(cardId)) {
            setSelectedCards([...selectedCards, cardId]);
        }
    };

    const handleInterpretation = async () => {
        try {
            const response = await axios.post('http://localhost:8080/tarots', {
                category: selectedCategory,
            });

            setTarotResult(response.data.data);
            setShowResult(true);
        } catch (error) {
            console.error('타로 해석을 불러오는 중 오류 발생:', error);
        }
    };

    return (
        <div className="tarot-page">
            <h1>타로 카드 선택</h1>
            <div>
                <label htmlFor="category-select">카테고리를 선택하세요:</label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">카테고리 선택</option>
                    <option value="운명">운명</option>
                    <option value="사랑">사랑</option>
                    <option value="금전">금전</option>
                    <option value="건강">건강</option>
                    {/* 필요에 따라 카테고리 추가 */}
                </select>
            </div>

            <div className="tarot-deck">
                {tarotDeck.map(card => (
                    <div
                        key={card.id}
                        className={`tarot-card ${selectedCards.includes(card.id) ? 'selected' : ''}`}
                        onClick={() => handleCardSelect(card.id)}
                    >
                        <img
                            src={`path/to/tarot_images/${card.id}.jpg`}
                            alt={card.name}
                            className="tarot-card-image"
                        />
                        <h3 className="tarot-card-title">{card.name}</h3>
                    </div>
                ))}
            </div>

            {selectedCards.length === 3 && selectedCategory && (
                <button onClick={handleInterpretation}>결과 보러가기 🐾</button>
            )}

            {showResult && tarotResult && (
                <div className="tarot-result">
                    <h2>{tarotResult.category}</h2>
                    <div className="card-reveal">
                        <p>첫 번째 카드: {tarotResult.firstCard}</p>
                        <p>두 번째 카드: {tarotResult.secondCard}</p>
                        <p>세 번째 카드: {tarotResult.thirdCard}</p>
                    </div>
                    <div className="tarot-interpretation">
                        <p>{tarotResult.result}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TarotPage;