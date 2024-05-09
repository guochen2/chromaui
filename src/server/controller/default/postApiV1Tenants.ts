import request, { type AxiosRequestConfig } from 'axios';
import { type DeepRequired } from '../../interface';

/**
 * Create Tenant
 * /api/v1/tenants
 */
export function postApiV1Tenants(config?: AxiosRequestConfig) {
  return request.post<DeepRequired<unknown>>(`/api/v1/tenants`, config);
}
