import internal from "stream";

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

export interface memberApiResponse {
    memberId: number;
    email: string;
    nickName: string;
    dreams: Dreams[]
    stampCount: number;
    pictures: [];
    memberStatus: string;
}

interface Dreams{
    dreamId: number;
    content: string;
    viewCount:number;

}