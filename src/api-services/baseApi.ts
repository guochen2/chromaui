/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response as T);
  };
}

/**
 * @title FastAPI
 * @version 0.1.0
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @name Root
     * @summary Root
     * @request GET:/api/v1
     */
    root: (params: RequestParams = {}) =>
      this.request<Record<string, number>, any>({
        path: `/api/v1`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name Reset
     * @summary Reset
     * @request POST:/api/v1/reset
     */
    reset: (params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/api/v1/reset`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name Version
     * @summary Version
     * @request GET:/api/v1/version
     */
    version: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/version`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name Heartbeat
     * @summary Heartbeat
     * @request GET:/api/v1/heartbeat
     */
    heartbeat: (params: RequestParams = {}) =>
      this.request<Record<string, number>, any>({
        path: `/api/v1/heartbeat`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name PreFlightChecks
     * @summary Pre Flight Checks
     * @request GET:/api/v1/pre-flight-checks
     */
    preFlightChecks: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/api/v1/pre-flight-checks`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name CreateDatabase
     * @summary Create Database
     * @request POST:/api/v1/databases
     */
    createDatabase: (
      query?: {
        /**
         * Tenant
         * @default "default_tenant"
         */
        tenant?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/databases`,
        method: 'POST',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name GetDatabase
     * @summary Get Database
     * @request GET:/api/v1/databases/{database}
     */
    getDatabase: (
      database: string,
      query?: {
        /**
         * Tenant
         * @default "default_tenant"
         */
        tenant?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/databases/${database}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name CreateTenant
     * @summary Create Tenant
     * @request POST:/api/v1/tenants
     */
    createTenant: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api/v1/tenants`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name GetTenant
     * @summary Get Tenant
     * @request GET:/api/v1/tenants/{tenant}
     */
    getTenant: (tenant: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/tenants/${tenant}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name ListCollections
     * @summary List Collections
     * @request GET:/api/v1/collections
     */
    listCollections: (
      query?: {
        /** Limit */
        limit?: number | null;
        /** Offset */
        offset?: number | null;
        /**
         * Tenant
         * @default "default_tenant"
         */
        tenant?: string;
        /**
         * Database
         * @default "default_database"
         */
        database?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/collections`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name CreateCollection
     * @summary Create Collection
     * @request POST:/api/v1/collections
     */
    createCollection: (
      query?: {
        /**
         * Tenant
         * @default "default_tenant"
         */
        tenant?: string;
        /**
         * Database
         * @default "default_database"
         */
        database?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/collections`,
        method: 'POST',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name CountCollections
     * @summary Count Collections
     * @request GET:/api/v1/count_collections
     */
    countCollections: (
      query?: {
        /**
         * Tenant
         * @default "default_tenant"
         */
        tenant?: string;
        /**
         * Database
         * @default "default_database"
         */
        database?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/count_collections`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name Add
     * @summary Add
     * @request POST:/api/v1/collections/{collection_id}/add
     */
    add: (collectionId: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/collections/${collectionId}/add`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name Update
     * @summary Update
     * @request POST:/api/v1/collections/{collection_id}/update
     */
    update: (collectionId: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/collections/${collectionId}/update`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name Upsert
     * @summary Upsert
     * @request POST:/api/v1/collections/{collection_id}/upsert
     */
    upsert: (collectionId: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/collections/${collectionId}/upsert`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name Get
     * @summary Get
     * @request POST:/api/v1/collections/{collection_id}/get
     */
    get: (collectionId: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/collections/${collectionId}/get`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name Delete
     * @summary Delete
     * @request POST:/api/v1/collections/{collection_id}/delete
     */
    delete: (collectionId: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/collections/${collectionId}/delete`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name Count
     * @summary Count
     * @request GET:/api/v1/collections/{collection_id}/count
     */
    count: (collectionId: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/collections/${collectionId}/count`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name GetNearestNeighbors
     * @summary Get Nearest Neighbors
     * @request POST:/api/v1/collections/{collection_id}/query
     */
    getNearestNeighbors: (collectionId: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/collections/${collectionId}/query`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name GetCollection
     * @summary Get Collection
     * @request GET:/api/v1/collections/{collection_name}
     */
    getCollection: (
      collectionName: string,
      query?: {
        /**
         * Tenant
         * @default "default_tenant"
         */
        tenant?: string;
        /**
         * Database
         * @default "default_database"
         */
        database?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/collections/${collectionName}`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name DeleteCollection
     * @summary Delete Collection
     * @request DELETE:/api/v1/collections/{collection_name}
     */
    deleteCollection: (
      collectionName: string,
      query?: {
        /**
         * Tenant
         * @default "default_tenant"
         */
        tenant?: string;
        /**
         * Database
         * @default "default_database"
         */
        database?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/collections/${collectionName}`,
        method: 'DELETE',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UpdateCollection
     * @summary Update Collection
     * @request PUT:/api/v1/collections/{collection_id}
     */
    updateCollection: (collectionId: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/api/v1/collections/${collectionId}`,
        method: 'PUT',
        format: 'json',
        ...params,
      }),
  };
}
