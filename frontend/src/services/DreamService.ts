import { LargeNumberLike } from "crypto";
import { postData, getData } from "./index.ts";
import { GetDreamsResponse, PostDreamResponse, GetDreamResponse } from '../interfaces/dreamsResponse.ts';

const REQUEST_URL: string = "http://localhost:8080/dreams";

export const postDream = async (prompt:string): Promise<any> => {
    try {
        const response = await postData<PostDreamResponse>(REQUEST_URL, prompt);
        return response; // result에서 DreamData 반환
    } catch (error) {
        throw new Error('Interpretation 요청 실패');
    }
};

export const getDream = async (pathVariable: number): Promise<any> => {
    try {
        const response = await getData<GetDreamResponse>(REQUEST_URL + '/' + pathVariable);
        return response;
    } catch (error) {
        console.error(error)
        throw new Error('GET 요청 실패');
    }
}

export const getDreams = async (page: number, size: number, dreamKeyword?: string): Promise<any> => {
    const currentkeyword = dreamKeyword ? 'dreamKeyword=' + dreamKeyword + "&" : ""
    const url = REQUEST_URL + '?' + currentkeyword + 'page=' + page + '&size=' + size;
    
    try {
        const response = await getData<GetDreamsResponse>(url);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error)
        throw new Error('GET 요청 실패');
    }
}