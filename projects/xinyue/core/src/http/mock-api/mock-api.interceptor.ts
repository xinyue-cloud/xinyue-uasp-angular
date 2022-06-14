import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Inject, Injectable }                                                         from "@angular/core";

import { Observable, of, throwError } from "rxjs";
import { delay, switchMap }           from "rxjs/operators";

import { KU_MOCK_API_DEFAULT_DELAY, MOCK_API_CLOSED } from "./mock-api.constants";
import { KuMockApiService }                           from "./mock-api.service";
import { KuMockApiResponse }                          from "./mock-api.types";

@Injectable()
export class KuMockApiInterceptor implements HttpInterceptor {

  constructor(
    @Inject(KU_MOCK_API_DEFAULT_DELAY) private defaultDelay: number,
    @Inject(MOCK_API_CLOSED) private closed: boolean,
    private mockApiService: KuMockApiService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    // 如果未启用，直接给下一处理器
    if (this.closed) {
      return next.handle(request);
    }

    const {
      handler,
      urlParams,
    } = this.mockApiService.findHandler(request.method, request.url);

    if (!handler) {
      return next.handle(request);
    }

    handler.request = request;
    handler.urlParams = urlParams;

    return handler.response.pipe(
      delay(handler.delay ?? this.defaultDelay ?? 0),
      switchMap((response: KuMockApiResponse) => {
        if (!response) {
          return throwError(new HttpErrorResponse({
            error     : "NOT FOUND",
            status    : 404,
            statusText: "NOT FOUND",
          }));
        } else if (response.status >= 200 && response.status < 300) {
          return of(new HttpResponse({
            body      : response.body,
            status    : response.status,
            statusText: "OK",
          }));
        }
        return throwError(new HttpErrorResponse({
          error     : response.body.message,
          status    : response.status,
          statusText: "ERROR",
        }));
      }));
  }

}
