import React from "react";
import '../styles/result.css';
import { useMember } from "../hooks/MemberManager";
import Swal from 'sweetalert2'; // SweetAlert2 임포트

type ShareProps = {
    boardId: number;
    username: string | null;
    content: string;
    onClick?(parm?: any): void;
};

const Share: React.FC<ShareProps> = ({ boardId, username, content }) => {
    const shareUrl = `http://dream-high.s3-website.ap-northeast-2.amazonaws.com/board/${boardId}`;
    const { login } = useMember();

    const showLoginAlert = () => {
        Swal.fire({
            title: '로그인하라냥!',
            text: '로그인해야 공유할 수 있다냥.',
            icon: 'warning',
            confirmButtonText: '로그인하러 가기',
            showCancelButton: true,
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                // 로그인 페이지로 리다이렉트하는 로직을 여기에 추가할 수 있습니다.
                window.location.href = '/login-home'; // 로그인 페이지로 이동
            }
        });
    };

    const handleShareKakaoClick = () => {
        if (!login) {
            showLoginAlert();
            return;
        }

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

    const handleShareTwitterClick = () => {
        if (!login) {
            showLoginAlert();
            return;
        }

        const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(username + '님의 해몽 결과를 확인하세요!')}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterIntent, '_blank');
    };

    const handleShareInstagramClick = () => {
        if (!login) {
            showLoginAlert();
            return;
        }

        const instagramUsername = 'target_username';  // 공유할 상대방의 인스타그램 사용자 이름
        const instagramUrl = `https://www.instagram.com/direct/inbox/`;
        const deepLink = `instagram://user?username=${instagramUsername}`;

    
        Swal.fire({
                icon: 'error',
                title: 'Instagram이 냥이를 거부한다냥😿',
                text: '너무 나쁜 집사다냥!🐾',
                confirmButtonText: '알겠다냥!'
        }).then(() => {
                
        });
        

        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                alert('링크가 클립보드에 복사되었습니다!');

                if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
                    window.location.href = deepLink;
                } else {
                    window.location.href = instagramUrl;
                }
            })
            .catch(err => {
                console.error('클립보드에 복사 실패:', err);
            });
    };

    const handleCopyLinkClick = () => {
        if (!login) {
            showLoginAlert();
            return;
        }
        Swal.fire({
                icon: 'error',
                title: 'ClipBoard가 냥이를 거부한다냥😿',
                text: '너무 나쁜 집사다냥!🐾',
                confirmButtonText: '알겠다냥!'
        }).then(() => {
                
        });
            
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                alert('공유 링크가 클립보드에 복사되었습니다!');
            })
            .catch(err => {
                console.error('클립보드에 복사 실패:', err);
            });
    };

    return (
        <div className="share-buttons">
            <div id="result-sharing-kakao" onClick={handleShareKakaoClick}>
            </div>
            <div id="result-sharing-x" onClick={handleShareTwitterClick}>
            </div>
            <div id="result-sharing-insta" onClick={handleShareInstagramClick}>
            </div>
            <div id="result-sharing-link" onClick={handleCopyLinkClick}></div>
        </div>
    );
}

export default Share;
