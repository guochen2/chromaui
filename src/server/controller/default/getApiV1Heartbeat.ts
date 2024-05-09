import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

export interface GetApiV1HeartbeatResult {
    [key: string]: any;
}

/**
 * Heartbeat
 * /api/v1/heartbeat
 */
export function getApiV1Heartbeat(config?: AxiosRequestConfig) {
    return request.get<DeepRequired<GetApiV1HeartbeatResult>>(`/api/v1/heartbeat`, config);
}
