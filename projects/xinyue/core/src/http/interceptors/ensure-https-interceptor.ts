import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable }                                           from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class KuEnsureHttpsInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const secureReq = request.clone({
      url: request.url.replace('http://', 'https://'),
    });
    return next.handle(secureReq);
  }

}
