import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable }                                           from '@angular/core';

import { Observable } from 'rxjs';

import { HEADER_AUTHORIZATION, TOKEN_PREFIX, TOKEN_STORAGE_NAME } from '../../utils';
import { KuTokenStorage }                                         from '../../services';

@Injectable()
export class KuTokenInterceptor implements HttpInterceptor {

  constructor(
    private storage: KuTokenStorage,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.headers.has(HEADER_AUTHORIZATION)) {
      const authToken = this.storage.getItem(TOKEN_STORAGE_NAME);
      if (authToken) {
        const authRequest = request.clone({
          headers: request.headers.set(HEADER_AUTHORIZATION, TOKEN_PREFIX + authToken),
        });
        return next.handle(authRequest);
      }
    }
    return next.handle(request);
  }
}
