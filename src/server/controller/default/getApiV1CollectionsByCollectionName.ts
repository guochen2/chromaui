import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

/**
 * Get Collection
 * /api/v1/collections/{collection_name}
 */
export function getApiV1CollectionsByCollectionName(params: GetApiV1CollectionsByCollectionNameParams, config?: AxiosRequestConfig) {
    const paramsInput = {
        tenant: params.tenant,
        database: params.database,
    };
    return request.get<DeepRequired<unknown>>(`/api/v1/collections/${params.collection_name}`, {
        params: paramsInput,
        ...config,
    });
}

export interface GetApiV1CollectionsByCollectionNameParams {
    collection_name: string;
    tenant?: string;
    database?: string;
}
