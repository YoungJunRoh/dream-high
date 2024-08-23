import { login, postData } from "./index.ts";
import { LoginResponse } from '../interfaces/member.ts';
import { AxiosResponse, AxiosRequestConfig, AxiosHeaderValue } from 'axios';

interface statusCode {
    status: number;
}

const LOGIN_URL: string = 'http://localhost:8080/auth/login';
const LOGOUT_URL: string = 'http://localhost:8080/auth/logout';
const REQUEST_URL: string = 'http://localhost:8080/members';
const EMAIL_URL: string = 'http://localhost:8080/api/email/send-verification';
const VERIFY_EMAIL_URL: string = 'http://localhost:8080/api/email/verify'


export const postLogin = async (username: string, password: string) => {
    const response = await login<LoginResponse>(LOGIN_URL, { username, password });
    return response; // result에서 DreamData 반환

};

export const postLogout = async (accessToken: AxiosRequestConfig): Promise<AxiosResponse> => {
    const response = await postData<AxiosResponse>(LOGOUT_URL, {}, accessToken);
    return response; // result에서 DreamData 반환
};

export const postMember = async (email: string, password: string, nickName: string): Promise<AxiosResponse> => {
    const response = await postData<AxiosResponse>(REQUEST_URL, { email, password, nickName });
    return response; // result에서 DreamData 반환
}

export const postEmail = async (email: string): Promise<AxiosResponse> => {
    const response = await postData<AxiosResponse>(EMAIL_URL, { email });
    return response; // result에서 DreamData 반환
}

export const postVerifyEmail = async (email: string, code: string) => {
    console.log('---------------postVerifyEmail---------------')
    const response = await postData<AxiosResponse>(VERIFY_EMAIL_URL, { email, code });
    console.log("RE" + response);
    return response;
}