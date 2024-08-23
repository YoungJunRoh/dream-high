import { postData, getData } from "./index.ts";
import { GetsApiResponse, PostDreamResponse, GetApiResponse } from '../interfaces/dream.ts';

const REQUEST_URL: string = "http://localhost:8080/dreams";

export const postDream = async (prompt: string) => {
    const response = await postData<PostDreamResponse>(REQUEST_URL, prompt);
    return response; // result에서 DreamData 반환
};

export const getDream = async (pathVariable: number) => {
    const response = await getData<GetApiResponse>(REQUEST_URL + '/' + pathVariable);
    return response;
}

export const getDreams = async (page: number, size: number, dreamKeyword?: string) => {
    const currentkeyword = dreamKeyword ? 'dreamKeyword=' + dreamKeyword + "&" : ""
    const url = REQUEST_URL + '?' + currentkeyword + 'page=' + page + '&size=' + size;

    const response = await getData<GetsApiResponse>(url);
    console.log(response);
    return response;
}