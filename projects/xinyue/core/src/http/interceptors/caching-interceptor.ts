import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable }                                                                       from '@angular/core';

import { Observable, of }  from 'rxjs';
import { startWith, tap }  from 'rxjs/operators';
import { KuLoggerService } from '../../logger';

import { KuRequestCache } from './request-cache.service';

@Injectable()
export class KuCachingInterceptor implements HttpInterceptor {

  constructor(
    private cache: KuRequestCache,
    private logger: KuLoggerService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.isCacheable(request)) {
      this.logger.debug('Not Cache Url = ' + request.urlWithParams);
      return next.handle(request);
    }

    const cachedResponse = this.cache.get(request);
    if (request.headers.get('X-REFRESH')) {
      const results$ = this.sendRequest(request, next);
      return cachedResponse ? results$.pipe(startWith(cachedResponse)) : results$;
    }

    return cachedResponse ? of(cachedResponse) : this.sendRequest(request, next);
  }

  isCacheable(request: HttpRequest<any>): boolean {
    return request.method === 'GET' && request.headers.get('Cache-Control') !== 'no-cache';
  }

  sendRequest(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const noHeaderReq = request.clone({ headers: new HttpHeaders() });

    return next.handle(noHeaderReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.put(request, event);
        }
      }),
    );
  }

}
