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