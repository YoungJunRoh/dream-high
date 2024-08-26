import React, { useRef } from 'react'; // React와 useRef 훅을 가져옵니다.
import html2canvas from 'html2canvas'; // html2canvas 라이브러리를 가져옵니다.

// ImageCapture 컴포넌트를 정의합니다.
const ImageCapture: React.FC = () => {
    // 캡처할 DOM 요소의 참조를 저장할 ref를 생성합니다.
    const captureRef = useRef<HTMLDivElement>(null);

    // 이미지 캡처 및 다운로드 함수 정의
    const handleCapture = async () => {
        // 캡처할 요소가 존재하는지 확인합니다.
        if (captureRef.current) {
            // html2canvas를 사용하여 DOM 요소를 캡처합니다.
            const canvas = await html2canvas(captureRef.current);
            // 캡처한 이미지를 PNG 형식으로 변환하여 데이터 URL을 생성합니다.
            const dataUrl = canvas.toDataURL('image/png');

            // 다운로드 링크를 생성합니다.
            const link = document.createElement('a');
            // 링크의 href 속성에 캡처한 이미지 URL을 설정합니다.
            link.href = dataUrl;
            // 다운로드할 파일 이름을 설정합니다.
            link.download = 'captured-image.png';

            // 링크를 DOM에 추가하여 클릭 이벤트를 발생시킵니다.
            document.body.appendChild(link);
            // 링크를 클릭하여 다운로드를 시작합니다.
            link.click();
            // 다운로드 후 링크를 DOM에서 제거하여 메모리를 정리합니다.
            document.body.removeChild(link);
        }
    };

    return (
        <div>
            <h1>화면 캡처</h1>
            {/* 캡처할 영역을 정의하고 ref를 연결합니다. */}
            <div ref={captureRef} style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
                <h2>캡처할 내용</h2>
                <p>여기에 캡처할 내용을 작성하세요.</p>
            </div>
            {/* 이미지 저장하기 버튼 클릭 시 handleCapture 함수를 호출합니다. */}
            <button onClick={handleCapture}>이미지 저장하기</button>
        </div>
    );
};

// ImageCapture 컴포넌트를 외부에서 사용할 수 있도록 내보냅니다.
export default ImageCapture;
