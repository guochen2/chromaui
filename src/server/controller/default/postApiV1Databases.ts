import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

/**
 * Create Database
 * /api/v1/databases
 */
export function postApiV1Databases(params: PostApiV1DatabasesParams, config?: AxiosRequestConfig) {
    const paramsInput = {
        tenant: params.tenant,
    };
    return request.post<DeepRequired<unknown>>(`/api/v1/databases`, null, {
        params: paramsInput,
        ...config,
    });
}

export interface PostApiV1DatabasesParams {
    tenant?: string;
}
