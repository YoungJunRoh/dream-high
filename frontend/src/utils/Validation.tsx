import React from "react"
import Swal from "sweetalert2"

const validatePassword = (input: string): boolean => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    return regex.test(input);
}

export const PasswordValidation = (password: string): void => {
    if (password.length < 8) {
        Swal.fire({
            text: '비밀번호는 8자 이상이다냥~',
            icon: 'error'
        });
    } else if (password.length > 16) {
        Swal.fire({
            text: '비밀번호는 15자 이내여야 한다냥~',
            icon: 'error'
        });
    } else if (!validatePassword(password)) {
        Swal.fire({
            text: '비밀번호에는 영어와 숫자, 특수문자가 포함되어야 한다냥~',
            icon: 'error'
        });
    }
}