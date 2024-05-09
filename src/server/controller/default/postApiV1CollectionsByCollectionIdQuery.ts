import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

/**
 * Get Nearest Neighbors
 * /api/v1/collections/{collection_id}/query
 */
export function postApiV1CollectionsByCollectionIdQuery(params: PostApiV1CollectionsByCollectionIdQueryParams, config?: AxiosRequestConfig) {
    return request.post<DeepRequired<unknown>>(`/api/v1/collections/${params.collection_id}/query`, config);
}

export interface PostApiV1CollectionsByCollectionIdQueryParams {
    collection_id: string;
}
