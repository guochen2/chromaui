import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

/**
 * List Collections
 * /api/v1/collections
 */
export function getApiV1Collections(params: GetApiV1CollectionsParams, config?: AxiosRequestConfig) {
    const paramsInput = {
        limit: params.limit,
        offset: params.offset,
        tenant: params.tenant,
        database: params.database,
    };
    return request.get<DeepRequired<unknown>>(`/api/v1/collections`, {
        params: paramsInput,
        ...config,
    });
}

export interface GetApiV1CollectionsParams {
    limit?: unknown;
    offset?: unknown;
    tenant?: string;
    database?: string;
}
