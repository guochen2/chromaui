import request, { type AxiosRequestConfig } from 'axios';
import { type DeepRequired } from '../../interface';

/**
 * Update Collection
 * /api/v1/collections/{collection_id}
 */
export function putApiV1CollectionsByCollectionId(
  params: PutApiV1CollectionsByCollectionIdParams,
  config?: AxiosRequestConfig
) {
  return request.put<DeepRequired<unknown>>(
    `/api/v1/collections/${params.collection_id}`,
    config
  );
}

export interface PutApiV1CollectionsByCollectionIdParams {
  collection_id: string;
}
