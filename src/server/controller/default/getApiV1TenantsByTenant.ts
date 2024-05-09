import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

/**
 * Get Tenant
 * /api/v1/tenants/{tenant}
 */
export function getApiV1TenantsByTenant(params: GetApiV1TenantsByTenantParams, config?: AxiosRequestConfig) {
    return request.get<DeepRequired<unknown>>(`/api/v1/tenants/${params.tenant}`, config);
}

export interface GetApiV1TenantsByTenantParams {
    tenant: string;
}
