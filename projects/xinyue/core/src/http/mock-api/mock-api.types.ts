import { HttpRequest } from '@angular/common/http';
import { Observable }  from 'rxjs';
import { HttpResult }  from '../../types';

export class KuMockApiResponse {

  status!: number;
  body!: HttpResult<any>;

  static builder(status: number, body: HttpResult<any>): KuMockApiResponse {
    const response = new KuMockApiResponse();
    response.status = status;
    response.body = body;
    return response;
  }

}

export type KuMockApiReplyCallback =
  | ((request: HttpRequest<any>, urlParams: { [key: string]: string }) => KuMockApiResponse | Observable<KuMockApiResponse>)
  | undefined;

export type KuMockApiMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
