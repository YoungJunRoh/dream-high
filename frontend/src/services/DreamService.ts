import { postData, getData } from "./index.ts";
import { GetsApiResponse, PostApiResponse, GetApiResponse } from '../interfaces/dream.ts';
import { BASED_URL } from '../constants/ApiUrl.ts';
import { AxiosRequestConfig } from "axios";

const POSTDREAM_URL = BASED_URL + '/dreams'

export const postDream = async (prompt: string) => {
    const response = await postData<PostApiResponse>(POSTDREAM_URL, prompt);
    return response; // result에서 DreamData 반환
};

export const getDream = async (pathVariable: number, accessToken?: AxiosRequestConfig) => {
    const response = await getData<GetApiResponse>(POSTDREAM_URL + '/' + pathVariable, accessToken );
    return response;
}

export const getDreams = async (page: number, size: number, dreamKeyword?: string) => {
    const currentkeyword = dreamKeyword ? 'dreamKeyword=' + dreamKeyword + "&" : ""
    const url = POSTDREAM_URL + '?' + currentkeyword + 'page=' + page + '&size=' + size;

    const response = await getData<GetsApiResponse>(url);
    console.log(response);
    return response;
}