import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

/**
 * Update
 * /api/v1/collections/{collection_id}/update
 */
export function postApiV1CollectionsByCollectionIdUpdate(params: PostApiV1CollectionsByCollectionIdUpdateParams, config?: AxiosRequestConfig) {
    return request.post<DeepRequired<unknown>>(`/api/v1/collections/${params.collection_id}/update`, config);
}

export interface PostApiV1CollectionsByCollectionIdUpdateParams {
    collection_id: string;
}
