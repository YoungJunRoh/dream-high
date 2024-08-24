import React from "react";
import '../styles/result.css';

type ShareProps = {
    boardId: number;
    username: string | null;
    content: string;
    onClick?(parm?:any): void;
}

const Share: React.FC<ShareProps> = ({ boardId, username, content, onClick }) => {
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
                        mobileWebUrl: 'http://tdtest.kro.kr:3000/board/' + boardId,
                        webUrl: 'http://tdtest.kro.kr:3000/board/' + boardId,
                    },
                },
            });
        }
    }

    return (
        <div
            id='result-sharing-kakao'
            onClick={handleShareKakaoClick}
        >
        </div>
    );
}

export default Share;