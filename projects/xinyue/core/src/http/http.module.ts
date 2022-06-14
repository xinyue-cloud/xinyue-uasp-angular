import { CommonModule }                        from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule }                            from '@angular/core';

import { KuHttpErrorHandler }   from './fetch/handler';
import {
  KuCachingInterceptor,
  KuLoggerInterceptor,
  KuNoopInterceptor,
  KuRequestCache,
  KuRequestCacheWithMap,
  KuTokenInterceptor,
  KuUploadInterceptor,
}                               from './interceptors';
import { KuMockApiInterceptor } from './mock-api';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    KuHttpErrorHandler,
    { provide: KuRequestCache, useClass: KuRequestCacheWithMap },
    { provide: HTTP_INTERCEPTORS, useClass: KuNoopInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: KuLoggerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: KuTokenInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: KuCachingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: KuMockApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: KuUploadInterceptor, multi: true },
  ],
})
export class KuHttpModule {
}
