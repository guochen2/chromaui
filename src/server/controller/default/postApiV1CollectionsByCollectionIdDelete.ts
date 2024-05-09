import request, { type AxiosRequestConfig } from 'axios';
import { type DeepRequired } from '../../interface';

/**
 * Delete
 * /api/v1/collections/{collection_id}/delete
 */
export function postApiV1CollectionsByCollectionIdDelete(
  params: PostApiV1CollectionsByCollectionIdDeleteParams,
  data: any,
  config?: AxiosRequestConfig
) {
  return request.post<DeepRequired<unknown>>(
    `/api/v1/collections/${params.collection_id}/delete`,
    data,
    config
  );
}

export interface PostApiV1CollectionsByCollectionIdDeleteParams {
  collection_id: string;
}
