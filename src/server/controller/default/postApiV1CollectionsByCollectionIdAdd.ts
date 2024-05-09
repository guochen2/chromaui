import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

/**
 * Add
 * /api/v1/collections/{collection_id}/add
 */
export function postApiV1CollectionsByCollectionIdAdd(params: PostApiV1CollectionsByCollectionIdAddParams, config?: AxiosRequestConfig) {
    return request.post<DeepRequired<any>>(`/api/v1/collections/${params.collection_id}/add`, config);
}

export interface PostApiV1CollectionsByCollectionIdAddParams {
    collection_id: string;
}
