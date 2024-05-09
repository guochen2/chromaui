import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

/**
 * Count Collections
 * /api/v1/count_collections
 */
export function getApiV1CountCollections(params: GetApiV1CountCollectionsParams, config?: AxiosRequestConfig) {
    const paramsInput = {
        tenant: params.tenant,
        database: params.database,
    };
    return request.get<DeepRequired<unknown>>(`/api/v1/count_collections`, {
        params: paramsInput,
        ...config,
    });
}

export interface GetApiV1CountCollectionsParams {
    tenant?: string;
    database?: string;
}
