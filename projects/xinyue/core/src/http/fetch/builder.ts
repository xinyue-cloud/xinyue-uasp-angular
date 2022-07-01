import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable }              from 'rxjs';
import { catchError, map }         from 'rxjs/operators';

import { KuHttpService } from './http.service';

/**
 * 请求方法构造器。
 * @param method 请求方法装饰器名称：GET,POST,PUT
 */
export const methodBuilder = (method: string) => (url: string) => {
  return (target: KuHttpService, propertyKey: string, descriptor: PropertyDescriptor | any) => {

    // @ts-ignore
    const pPath = target[`${propertyKey}_Path_Parameters`];
    // @ts-ignore
    const pQuery = target[`${propertyKey}_Query_Parameters`];
    // @ts-ignore
    const pBody = target[`${propertyKey}_Body_Parameters`];
    // @ts-ignore
    const pHeader = target[`${propertyKey}_Header_Parameters`];

    descriptor.value = function (...args: any[]): Observable<any> {

      const body: string = createBody(pBody, descriptor, args);
      const params: HttpParams = createQuery(pQuery, args);
      const headers: HttpHeaders = createHeaders(pHeader, descriptor, this.getDefaultHeaders(), args);
      const resUrl = this.getBaseUrl() + createPath(url, pPath, args);

      const observable: Observable<any> = this.http.request(method, resUrl, {
        body,
        headers,
        params,
      });
      return responseHandler(this, observable, descriptor.adapter);
    };

    return descriptor;
  };
};

/**
 * 请求方法参数构造器。
 * @param paramName 参数装饰器名称
 */
export const paramBuilder = (paramName: string) => {
  return (key: string) => (target: KuHttpService, propertyKey: string, parameterIndex: number) => {

    const metadataKey = `${propertyKey}_${paramName}_Parameters`;
    const paramObj: any = {
      key,
      parameterIndex,
    };

    // @ts-ignore
    if (Array.isArray(target[metadataKey])) {
      // @ts-ignore
      target[metadataKey].push(paramObj);
    } else {
      // @ts-ignore
      target[metadataKey] = [paramObj];
    }
  };
};

const responseHandler = (target: KuHttpService, observable: Observable<any>, adapterFn?: (response: any) => any): Observable<any> => {

  return observable.pipe(
    map((response: any) => {
      if (adapterFn) {
        return adapterFn.call(target, response);
      }
      /*    if (response instanceof HttpResult) {
              if (response.success) {
                return response.data;
              } else {
                if (response.message != null) {
                  target.tip.error(response.message);
                }
              }
              return throwError(response.message);
            }*/
      return response;
    }),
    catchError((err, source) => {
      return target.errorHandler.onCatch(err, source);
    }),
  );
};

const createBody = (pBody: Array<any>, descriptor: any, args: Array<any>): string => {

  if (descriptor.isFormData) {
    return args[0];
  }
  return pBody ? args[pBody[0].parameterIndex] : null;
};

const createPath = (url: string, pPath: Array<any>, args: Array<any>): string => {

  let resUrl: string = url;
  if (pPath) {
    for (const k in pPath) {
      if (pPath.hasOwnProperty(k)) {
        resUrl = resUrl.replace('{' + pPath[k].key + '}', args[pPath[k].parameterIndex]);
      }
    }
  }
  return resUrl;
};

const createQuery = (pQuery: any, args: Array<any>): HttpParams => {

  let search = new HttpParams();
  if (pQuery) {
    pQuery
      // @ts-ignore
      .filter(p => args[p.parameterIndex] != null)
      // @ts-ignore
      .forEach(pq => {
        const key = pq.key;
        const value = args[pq.parameterIndex];
        if (value instanceof Object) {
          for (const k in value) {
            if (value.hasOwnProperty(k)) {
              let v = value[k];
              if (v) {
                if (v instanceof Object) {
                  v = JSON.stringify(v);
                }
                search = search.set(encodeURIComponent(k), encodeURIComponent(v));
              }
            }
          }
        } else {
          search = search.set(encodeURIComponent(key), encodeURIComponent(value));
        }
      });
  }
  return search;
};

const createHeaders = (pHeader: any, descriptor: any, defaultHeaders: any, args: Array<any>): HttpHeaders => {

  let headers = new HttpHeaders(defaultHeaders);

  for (const k in descriptor.headers) {
    if (descriptor.headers.hasOwnProperty(k)) {
      if (headers.has(k)) {
        headers = headers.delete(k);
      }
      headers = headers.append(k, descriptor.headers[k]);
    }
  }

  if (pHeader) {
    for (const k in pHeader) {
      if (pHeader.hasOwnProperty(k)) {
        if (headers.has(k)) {
          headers = headers.delete(k);
        }
        headers = headers.append(pHeader[k].key, args[pHeader[k].parameterIndex]);
      }
    }
  }

  return headers;
};
