import { login, postData } from "./index.ts";
import { LoginResponse } from '../interfaces/member.ts';
import { AxiosResponse, AxiosRequestConfig, AxiosHeaderValue } from 'axios';
import { BASED_URL } from '../constants/ApiUrl.ts';

interface statusCode {
    status: number;
}

const LOGIN_URL: string = BASED_URL+ '/auth/login';
const LOGOUT_URL: string = BASED_URL + '/auth/logout';
const REGISTER_URL: string = BASED_URL + '/members';
const EMAIL_URL: string = BASED_URL + '/api/email/send-verification';
const VERIFY_EMAIL_URL: string = BASED_URL + '/api/email/verify'

export const postLogin = async (username: string, password: string) => {
    const response = await login<LoginResponse>(LOGIN_URL, { username, password });
    return response; // result에서 DreamData 반환
};

export const postLogout = async (accessToken: AxiosRequestConfig): Promise<AxiosResponse> => {
    const response = await postData<AxiosResponse>(LOGOUT_URL, {}, accessToken);
    return response; // result에서 DreamData 반환
};

export const postMember = async (email: string, password: string, nickName: string, authCode:string): Promise<AxiosResponse> => {
    const response = await postData<AxiosResponse>(REGISTER_URL, { email, password, nickName, authCode });
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