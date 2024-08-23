import { login, postData } from "./index.ts";
import { LoginResponse } from '../interfaces/member.ts';
import { AxiosResponse, AxiosRequestConfig, AxiosHeaderValue } from 'axios';

const LOGIN_URL: string = 'http://localhost:8080/auth/login';
const LOGOUT_URL: string = 'http://localhost:8080/auth/logout';
const REQUEST_URL: string = 'http://localhost:8080/members';
const EMAIL_URL: string = 'http://localhost:8080/api/email/send-verification';
const VERIFY_EMAIL_URL: string = 'http://localhost:8080/api/email/verify'

export const postLogin = async (username: string, password: string): Promise<LoginResponse> => {
    //리스폰스로 오는것들 인터페이스로 구현해야함
    try {
        const response = await login<LoginResponse>(LOGIN_URL, { username, password });
        return response; // result에서 DreamData 반환
    } catch (error) {
        throw new Error('Interpretation 요청 실패');
    }
};

export const postLogout = async (accessToken: AxiosRequestConfig): Promise<AxiosResponse> => {
    try {
        const response = await postData<AxiosResponse>(LOGOUT_URL, {}, accessToken);
        return response.allResponse; // result에서 DreamData 반환
    } catch (error) {
        throw new Error('Interpretation 요청 실패');
    }
};

export const postMember = async (email: string, password: string, nickName: string): Promise<AxiosResponse> => {
    const response = await postData<AxiosResponse>(REQUEST_URL, { email, password, nickName });
    return response.allResponse;
}

export const postEmail = async (email: string): Promise<AxiosResponse> => {
    const response = await postData<AxiosResponse>(EMAIL_URL, { email });
    return response.allResponse;
}

export const postVerifyEmail = async (email: string, code: string): Promise<AxiosResponse> => {
    const response = await postData<AxiosResponse>(VERIFY_EMAIL_URL, { email, code });
    return response.allResponse;
}