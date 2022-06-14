export class HttpResult<T> {

  public code?: number;
  public success?: boolean;
  public message?: string;
  public data?: T | any;

  static builder<T>(success: boolean, code?: number, message?: string, data?: T): HttpResult<T> {
    const httpResult = new HttpResult<T>();
    httpResult.success = success;
    httpResult.code = code;
    httpResult.message = message;
    httpResult.data = data;
    return httpResult;
  }

  static error(message: string, code?: number): HttpResult<any> {
    return HttpResult.builder(false, code, message);
  }

  static ok(code?: number, message?: string): HttpResult<any> {
    return HttpResult.builder(true, code, message);
  }

  static okBody(data: any): HttpResult<any> {
    return HttpResult.builder(true, undefined, undefined, data);
  }
}
