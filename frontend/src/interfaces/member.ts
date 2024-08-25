import { Axios } from "axios";
import { AxiosRequestConfig } from 'axios'
import { useMember } from "../hooks/MemberManager";

const {authorization} = useMember();

export interface MemerLogin {
    username: string;
    password: string;
}
interface Headers {
    authorization: string;
    refresh: string;
}

export interface LoginResponse {
    headers: Headers;
}

export const accessToken: AxiosRequestConfig = {
    headers: {
        Authorization: authorization,
    },
};