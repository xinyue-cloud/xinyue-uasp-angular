import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable }                                           from '@angular/core';

import { Observable } from 'rxjs';
import { finalize }   from 'rxjs/operators';

import { KuLoggerService } from '../../logger';

@Injectable()
export class KuLoggerInterceptor implements HttpInterceptor {

  constructor(
    private logger: KuLoggerService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const started = Date.now();
    return next.handle(request).pipe(
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${request.method} "${request.urlWithParams}" ${elapsed} ms. body= ` + JSON.stringify(request.body);
        this.logger.debug(msg);
      }),
    );
  }
}
