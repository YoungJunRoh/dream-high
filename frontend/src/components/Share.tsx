import React from "react";
import '../styles/result.css';

type ShareProps = {
    boardId: number;
    username: string | null; 
    content: string;
}

const Share: React.FC<ShareProps> = ({ boardId, username, content }) => {
    const shareUrl = `http://tdtest.kro.kr:3000/board/${boardId}`;
    
    const handleShareKakaoClick = () => {
        if (window.Kakao) {
            const kakao = window.Kakao;

            kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: username + '님의 해몽 결과다냥',
                    description: content.substring(0, 30) + '...',
                    imageUrl:
                        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.utoimage.com%2F%3Fm%3Dgoods.free%26mode%3Dview%26idx%3D22250682&psig=AOvVaw0NHQpVEQpAxakywtyyChcW&ust=1724386608224000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNCH5-veh4gDFQAAAAAdAAAAABAE' ??
                        '-디폴트 썸네일-',
                    link: {
                        mobileWebUrl: shareUrl,
                        webUrl: shareUrl,
                    },
                },
            });
        }
    };

    // 트위터(X) 공유
    const handleShareTwitterClick = () => {
        const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(username + '님의 해몽 결과를 확인하세요!')}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterIntent, '_blank');
    };

    // 인스타그램 공유 (링크 복사 기능 사용)
    const handleShareInstagramClick = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            alert('링크가 클립보드에 복사되었습니다. 인스타그램에 직접 붙여넣어 주세요.');
        } catch (err) {
            console.error('클립보드에 링크 복사 실패:', err);
        }
    };

    return (
        <div className="share-buttons">
            <div id="result-sharing-kakao" onClick={handleShareKakaoClick}>
            </div>
            <div id="result-sharing-x" onClick={handleShareTwitterClick}>
            </div>
            <div id="result-sharing-insta" onClick={handleShareInstagramClick}>
            </div>
            <div id='result-sharing-link'></div>
        </div>
    );
}

export default Share;