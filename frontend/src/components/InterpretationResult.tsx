import React, { useEffect } from 'react';
import ChatBalloon from '../components/ChatBalloon.tsx';
import Button from '../components/Button.tsx';
import '../styles/result.css';
import '../styles/global.css';
import ResultBox from '../components/ResultBox.tsx';
import ResultBigBox from '../components/BigBox.tsx';
import ResultSmallBox from '../components/SmallBox.tsx';
import Footer from '../components/Footer.tsx';

interface Window {
    Kakao: any; // Kakao 객체의 타입을 정확히 정의할 수 있다면, any 대신에 정의된 타입을 사용하세요.
}

interface DreamDatas {
    advice: string;
    interpertaionKeyword: string[];
    summary: string;
    dreamContent: string;
    interpertaionContent: string;
}

const InterpretationResult:React.FC<DreamDatas> = ({advice, interpertaionKeyword, summary, dreamContent, interpertaionContent } ) => {
    // useEffect(() => {
    //     if (!window.Kakao.isInitialized()) {
    //         // window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
    //         window.Kakao.init('');
    //     }
    // }, []);

    // const handleShareKakaoClick = () => {
    //     if (window.Kakao) {
    //         const kakao = window.Kakao;

    //         kakao.Share.sendDefault({
    //             objectType: 'feed',
    //             content: {
    //                 title: "TEST",
    //                 description: "TEST".substring(0, 30) + '...',
    //                 imageUrl:
    //                     'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.utoimage.com%2F%3Fm%3Dgoods.free%26mode%3Dview%26idx%3D22250682&psig=AOvVaw0NHQpVEQpAxakywtyyChcW&ust=1724386608224000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNCH5-veh4gDFQAAAAAdAAAAABAE' ??
    //                     '-디폴트 썸네일-',
    //                 link: {
    //                     mobileWebUrl: 'http://tdtest.kro.kr:3000/',
    //                     webUrl: 'http://tdtest.kro.kr:3000/',
    //                 },
    //             },
    //         });
    //     }
    // }

    return (
        <div className='background-morning'>
            <div className='result-cat'>
                <ChatBalloon message={advice} />
            </div>
            <ResultBox message={summary} />
            <div className='bottom-button'>
                {/* <Link to={'/dream-interpretation'}>
                    <Button
                        name='result'
                        mode='result'
                        draggable={true}>
                    </Button>
                </Link> */}
                <div id='result-sharing'>
                    <p className='font-bold'>공유하기</p>
                    <div id="result-sharing-area">
                        <div
                            id='result-sharing-kakao'
                            // onClick={handleShareKakaoClick}
                        ></div>
                        <div id='result-sharing-insta'></div>
                        <div id='result-sharing-x'></div>
                        <div id='result-sharing-link'></div>
                    </div>
                    <span className='font-normal result-font-size-18'>이미지로 저장하기</span>
                </div>
            </div>
            <ResultSmallBox name='자세한 꿈해몽이다 냥냥🐾' />
            <ResultBigBox mode='resultbox'>{interpertaionContent}</ResultBigBox>
            <Button
                name='타로 보러갈래냥?🐾'
                mode='gotarot'
                draggable={true}>
            </Button>
            <Footer></Footer>
        </div>
    );
}

export default InterpretationResult;