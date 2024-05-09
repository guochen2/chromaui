import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

/**
 * Create Collection
 * /api/v1/collections
 */
export function postApiV1Collections(params: PostApiV1CollectionsParams, config?: AxiosRequestConfig) {
    const paramsInput = {
        tenant: params.tenant,
        database: params.database,
    };
    return request.post<DeepRequired<unknown>>(`/api/v1/collections`, null, {
        params: paramsInput,
        ...config,
    });
}

export interface PostApiV1CollectionsParams {
    tenant?: string;
    database?: string;
}
