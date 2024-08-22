import { login } from "./index.ts";
import { AxiosResponse } from 'axios';
import { LoginResponse } from '../interfaces/login.ts';

const REQUEST_URL: string = "http://localhost:8080/auth/login";

export const postLogin = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await login<LoginResponse>(REQUEST_URL, { username, password });
        return response; // result에서 DreamData 반환
    } catch (error) {
        throw new Error('Interpretation 요청 실패');
    }
};