import { postData, getData, patchData } from "./index.ts";
import { GetsApiResponse, PostApiResponse, GetApiResponse } from '../interfaces/dream.ts';
import { BASED_URL } from '../constants/ApiUrl.ts';
import { AxiosRequestConfig, AxiosResponse } from "axios";


const POST_DREAM_URL = BASED_URL + '/dreams'

export const postDream = async (prompt: string) => {
    const response = await postData<PostApiResponse>(POST_DREAM_URL, prompt);
    return response; // result에서 DreamData 반환
};

export const postLike = async (dreamId: number, accessToken: AxiosRequestConfig) => {
    const url = POST_DREAM_URL + '/' + dreamId + '/likes';
    const response = await postData<AxiosResponse>(url, {}, accessToken);
    return response; // result에서 DreamData 반환
};

export const postComment = async (dreamId: number, content: string, accessToken: AxiosRequestConfig) => {
    const url = POST_DREAM_URL + '/' + dreamId + '/comments';
    const response = await postData<AxiosResponse>(url, { content, dreamId }, accessToken);
    return response; // result에서 DreamData 반환
};


export const getDream = async (pathVariable: number, accessToken?: AxiosRequestConfig) => {
    const response = await getData<GetApiResponse>(POSTDREAM_URL + '/' + pathVariable, accessToken );
    return response;
}

export const getDreams = async (page: number, size: number, dreamKeyword?: string) => {
    const currentkeyword = dreamKeyword ? 'dreamKeyword=' + dreamKeyword + "&" : ""
    const url = POST_DREAM_URL + '?' + currentkeyword + 'page=' + page + '&size=' + size;

    const response = await getData<GetsApiResponse>(url);
    return response;
}

export const updateDream = async (dreamId: number, secret: string, accessToken: AxiosRequestConfig) => {
    const url = POST_DREAM_URL + '/' + dreamId;
    const response = await patchData<GetApiResponse>(url, { dreamId, secret }, accessToken);
    return response;
}