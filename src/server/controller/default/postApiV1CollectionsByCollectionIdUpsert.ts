import request, { type AxiosRequestConfig } from 'axios';
import { type DeepRequired } from '../../interface';

/**
 * Upsert
 * /api/v1/collections/{collection_id}/upsert
 */
export function postApiV1CollectionsByCollectionIdUpsert(
  params: PostApiV1CollectionsByCollectionIdUpsertParams,
  config?: AxiosRequestConfig
) {
  return request.post<DeepRequired<unknown>>(
    `/api/v1/collections/${params.collection_id}/upsert`,
    config
  );
}

export interface PostApiV1CollectionsByCollectionIdUpsertParams {
  collection_id: string;
}
