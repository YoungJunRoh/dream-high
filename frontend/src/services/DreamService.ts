import { postData, getData } from "./index.ts";
import { GetDreamsResponse, PostDreamResponse, GetDreamResponse } from '../interfaces/dream.ts';

const REQUEST_URL: string = "http://localhost:8080/dreams";

export const postDream = async (prompt: string): Promise<any> => {
    const response = await postData<PostDreamResponse>(REQUEST_URL, prompt);
    return response; // result에서 DreamData 반환
};

export const getDream = async (pathVariable: number): Promise<any> => {
    const response = await getData<GetDreamResponse>(REQUEST_URL + '/' + pathVariable);
    return response;
}

export const getDreams = async (page: number, size: number, dreamKeyword?: string): Promise<any> => {
    const currentkeyword = dreamKeyword ? 'dreamKeyword=' + dreamKeyword + "&" : ""
    const url = REQUEST_URL + '?' + currentkeyword + 'page=' + page + '&size=' + size;

    const response = await getData<GetDreamsResponse>(url);
    console.log(response);
    return response;
}