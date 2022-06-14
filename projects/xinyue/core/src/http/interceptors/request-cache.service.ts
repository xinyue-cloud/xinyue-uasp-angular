import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable }                from '@angular/core';

import { KuLoggerService } from '../../logger';

export interface KuCacheEntry {
  url: string;
  response: HttpResponse<any>;
  lastRead: number;
}

export abstract class KuRequestCache {

  abstract get(request: HttpRequest<any>): HttpResponse<any> | undefined;

  abstract put(request: HttpRequest<any>, response: HttpResponse<any>): void
}

const maxAge = 5000;

@Injectable()
export class KuRequestCacheWithMap implements KuRequestCache {

  cache = new Map<string, KuCacheEntry>();

  constructor(
    private logger: KuLoggerService,
  ) {
  }

  get(request: HttpRequest<any>): HttpResponse<any> | undefined {

    const url = request.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - maxAge);
    const expired = isExpired ? 'expired ' : '';
    this.logger.debug(`Caching => Found ${expired}cached response for "${url}".`);
    return isExpired ? undefined : cached.response;
  }

  put(request: HttpRequest<any>, response: HttpResponse<any>): void {

    const url = request.urlWithParams;
    this.logger.debug(`Caching => Response from "${url}".`);

    this.cache.set(url, {
      url,
      response,
      lastRead: Date.now(),
    });

    const expired = Date.now() - maxAge;
    this.cache.forEach(entry => {
      if (entry.lastRead < expired) {
        this.cache.delete(entry.url);
      }
    });

    this.logger.debug(`Caching => Request cache size: ${this.cache.size}.`);
  }
}
