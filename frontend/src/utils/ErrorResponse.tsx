import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

type StatusCode = {
    code: number | null;
}

export const ErrorResponse: React.FC<StatusCode> = ({ code }) => {
    const [excute, setExcute] = useState<boolean>(false);

    const getErrorResponse = (code: number | null): string => {
        switch (code) {
            case 401:
                setExcute(true);
                return '로그인 후 이용 가능한 서비스다냥~';
            default:
                return '';
        }
    };

    useEffect(() => {
        if (excute && code !== null) {
            Swal.fire({
                title: 'Error',
                text: getErrorResponse(code),
                icon: 'error',
            });
            setExcute(false);
        }
    }, [excute, code]);

    return null; // 이 컴포넌트는 UI를 렌더링하지 않기 때문에 null을 반환
}
