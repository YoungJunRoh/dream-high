import { login, postData, getData, patchData } from "./index.ts";
import { LoginResponse } from '../interfaces/member.ts';
import { AxiosResponse, AxiosRequestConfig, AxiosHeaderValue } from 'axios';

interface statusCode {
    status: number;
}

const BASED_URL = process.env.REACT_APP_BASED_URL;
const LOGIN_URL: string = BASED_URL+ '/auth/login';
const LOGOUT_URL: string = BASED_URL + '/auth/logout';
const REGISTER_URL: string = BASED_URL + '/members';
const EMAIL_URL: string = BASED_URL + '/api/email/send-verification';
const VERIFY_EMAIL_URL: string = BASED_URL + '/api/email/verify'
const GET_MEMBER_URL: string = BASED_URL + '/members/member-email';

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

export const getMember = async (accessToken: AxiosRequestConfig): Promise<AxiosResponse> => {
    const response = await getData<AxiosResponse>(GET_MEMBER_URL, accessToken);
    return response; // result에서 DreamData 반환
}
export const patchProfile = async (memberId: number, profileUrl: string, accessToken: AxiosRequestConfig) => {
    const url = REGISTER_URL + '/' + memberId + '/profile';
    const response = await patchData<AxiosResponse>(url, { memberId, profileUrl }, accessToken);
    return response;
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