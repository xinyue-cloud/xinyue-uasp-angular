import { methodBuilder, paramBuilder } from './builder';
import { KuHttpService, MediaType }    from './http.service';

/*********************
 * 类型装饰器
 *********************/

/**
 * 用于设置基本URL ,用于访问 Web API 资源.
 *
 * ```ts
 * @BaseUrl('webapi/')
 * export class AccountClient extends HttpService {
 * }
 * ```
 * @param url 请求的基本路径。
 */
export function BaseUrl(url: string): <TFunction extends Function>(target: TFunction) => TFunction {
  return <TFunction extends Function>(target: TFunction): TFunction => {
    target.prototype.getBaseUrl = () => url;
    return target;
  };
}

/**
 * 设置默认的请求头信息
 * @param headers - 默认请求头,为 key-value 键值对
 */
export function DefaultHeaders(headers: any): <TFunction extends Function>(target: TFunction) => TFunction {
  return <TFunction extends Function>(target: TFunction): TFunction => {
    target.prototype.getDefaultHeaders = () => headers;
    return target;
  };
}

/**********************
 * 方法装饰器
 **********************/

export const GET = methodBuilder('Get');
export const POST = methodBuilder('Post');
export const PUT = methodBuilder('Put');
export const PATCH = methodBuilder('Patch');
export const DELETE = methodBuilder('Delete');
export const HEAD = methodBuilder('Head');

export const Headers = (headersDef: any) => (target: KuHttpService, propertyKey: string, descriptor: any) => {
  descriptor.headers = headersDef;
  return descriptor;
};

export const Produces = (producesDef: MediaType) => (target: KuHttpService, propertyKey: string, descriptor: any) => {
  descriptor.isJson = producesDef === MediaType.JSON;
  descriptor.isFormData = producesDef === MediaType.FORM_DATA;
  return descriptor;
};

export const Adapter = (adapterFn: Function) => (target: KuHttpService, propertyKey: string, descriptor: any) => {
  descriptor.adapter = adapterFn || null;
  return descriptor;
};

/**********************
 * 参数装饰器
 **********************/

export const Path = paramBuilder('Path');
export const Query = paramBuilder('Query')('Query');
export const Param = paramBuilder('Query');
export const Body = paramBuilder('Body')('Body');
export const Header = paramBuilder('Header');
