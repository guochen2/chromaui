import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

export interface GetApiV1Result {
    [key: string]: any;
}

/**
 * Root
 * /api/v1
 */
export function getApiV1(config?: AxiosRequestConfig) {
    return request.get<DeepRequired<GetApiV1Result>>(`/api/v1`, config);
}
