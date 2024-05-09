import request, { type AxiosRequestConfig } from "axios";
import { type DeepRequired } from "../../interface";

/**
 * Pre Flight Checks
 * /api/v1/pre-flight-checks
 */
export function getApiV1PreFlightChecks(config?: AxiosRequestConfig) {
    return request.get<DeepRequired<any>>(`/api/v1/pre-flight-checks`, config);
}
