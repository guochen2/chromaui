import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

/**
 * Get Database
 * /api/v1/databases/{database}
 */
export function getApiV1DatabasesByDatabase(params: GetApiV1DatabasesByDatabaseParams, config?: AxiosRequestConfig) {
    const paramsInput = {
        tenant: params.tenant,
    };
    return request.get<DeepRequired<unknown>>(`/api/v1/databases/${params.database}`, {
        params: paramsInput,
        ...config,
    });
}

export interface GetApiV1DatabasesByDatabaseParams {
    database: string;
    tenant?: string;
}
