import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

/**
 * Count
 * /api/v1/collections/{collection_id}/count
 */
export function getApiV1CollectionsByCollectionIdCount(params: GetApiV1CollectionsByCollectionIdCountParams, config?: AxiosRequestConfig) {
    return request.get<DeepRequired<unknown>>(`/api/v1/collections/${params.collection_id}/count`, config);
}

export interface GetApiV1CollectionsByCollectionIdCountParams {
    collection_id: string;
}
