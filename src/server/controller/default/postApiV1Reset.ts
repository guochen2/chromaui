import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

/**
 * Reset
 * /api/v1/reset
 */
export function postApiV1Reset(config?: AxiosRequestConfig) {
    return request.post<DeepRequired<boolean>>(`/api/v1/reset`, config);
}
