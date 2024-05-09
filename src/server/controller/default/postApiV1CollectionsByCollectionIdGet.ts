import request, { type AxiosRequestConfig } from 'axios';
import { type DeepRequired } from '../../interface';

/**
 * Get
 * /api/v1/collections/{collection_id}/get
 */
export function postApiV1CollectionsByCollectionIdGet(
  params: PostApiV1CollectionsByCollectionIdGetParams,
  data: any,
  config?: AxiosRequestConfig
) {
  return request.post<DeepRequired<unknown>>(
    `/api/v1/collections/${params.collection_id}/get`,
    data,
    config
  );
}

export interface PostApiV1CollectionsByCollectionIdGetParams {
  collection_id: string;
}
