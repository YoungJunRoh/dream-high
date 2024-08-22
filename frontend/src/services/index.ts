import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
import { APIResponse } from '../interfaces/response.ts';

const client: Axios = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// POST 메서드
export const postData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
    try {
        const response: AxiosResponse<APIResponse<T>> = await client.post<APIResponse<T>>(url, data, config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const login = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> => {
    try {
        const response: AxiosResponse<AxiosResponse<T>> = await client.post<AxiosResponse<T>>(url, data, config);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

// PATCH 메서드
export const patchData = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
    try {
        const response = await client.patch<APIResponse<T>>(url, data, config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// GET 메서드
export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
    try {
        const response = await client.get<APIResponse<T>>(url, config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// DELETE 메서드
export const deleteData = async <T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
    try {
        const response = await client.delete<APIResponse<T>>(url, config);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};