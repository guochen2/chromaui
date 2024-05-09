import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

/**
 * Delete Collection
 * /api/v1/collections/{collection_name}
 */
export function deleteApiV1CollectionsByCollectionName(params: DeleteApiV1CollectionsByCollectionNameParams, config?: AxiosRequestConfig) {
    const paramsInput = {
        tenant: params.tenant,
        database: params.database,
    };
    return request.delete<DeepRequired<unknown>>(`/api/v1/collections/${params.collection_name}`, {
        params: paramsInput,
        ...config,
    });
}

export interface DeleteApiV1CollectionsByCollectionNameParams {
    collection_name: string;
    tenant?: string;
    database?: string;
}
