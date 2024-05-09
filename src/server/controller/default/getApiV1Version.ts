import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

/**
 * Version
 * /api/v1/version
 */
export function getApiV1Version(config?: AxiosRequestConfig) {
    return request.get<DeepRequired<string>>(`/api/v1/version`, config);
}
