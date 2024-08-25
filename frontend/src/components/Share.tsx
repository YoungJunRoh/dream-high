import React from "react";
import '../styles/result.css';

type ShareProps = {
    boardId: number;
    username: string | null; 
    content: string;
    onClick?(parm?: any): void;
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
    const handleShareInstagramClick = () => {
        const instagramUsername = 'target_username';  // 공유할 상대방의 인스타그램 사용자 이름
        const instagramUrl = `https://www.instagram.com/direct/inbox/`;
        const deepLink = `instagram://user?username=${instagramUsername}`;

        // 인스타그램 앱이 설치되어 있는 경우 앱을 열고, 그렇지 않은 경우 웹 브라우저에서 열기
        if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
            window.location.href = deepLink;
        } else {
            window.location.href = instagramUrl;
        }
    };

    


    return (
        <div className="share-buttons">
            <div id="result-sharing-kakao" onClick={handleShareKakaoClick}>
                카카오톡 공유
            </div>
            <div id="result-sharing-twitter" onClick={handleShareTwitterClick}>
                트위터 공유
            </div>
            <div id="result-sharing-instagram" onClick={handleShareInstagramClick}>
                인스타그램 공유 (링크 복사)
            </div>
        </div>
    );
}

export default Share;