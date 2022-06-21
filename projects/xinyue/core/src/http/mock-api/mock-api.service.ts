import { Injectable }         from '@angular/core';
import { compact, fromPairs } from 'lodash-es';

import { KuConfigService }  from '../../services';
import { KuMockApiHandler } from './mock-api.request-handler';
import { KuMockApiMethods } from './mock-api.types';

export type KuMatchingHandler = { handler: KuMockApiHandler | undefined, urlParams: { [key: string]: string } };

@Injectable({
  providedIn: 'root',
})
export class KuMockApiService {

  private handlers: { [key: string]: Map<string, KuMockApiHandler> } = {
    DELETE: new Map<string, KuMockApiHandler>(),
    GET   : new Map<string, KuMockApiHandler>(),
    PATCH : new Map<string, KuMockApiHandler>(),
    POST  : new Map<string, KuMockApiHandler>(),
    PUT   : new Map<string, KuMockApiHandler>(),
  };

  constructor(
    private config: KuConfigService,
  ) {
  }

  findHandler(method: string, url: string): KuMatchingHandler {

    const matchingHandler: KuMatchingHandler = {
      handler  : undefined,
      urlParams: {},
    };

    const urlParts = url.split('/');
    const handlers = this.handlers[method.toUpperCase()];
    handlers.forEach((handler, handlerUrl) => {
      if (matchingHandler.handler) {
        return;
      }
      const handlerUrlParts = handlerUrl.split('/');
      if (urlParts.length !== handlerUrlParts.length) {
        return;
      }

      const matches = handlerUrlParts.every((value, index) => {
        return value === urlParts[index] || value.startsWith(':');
      });
      if (matches) {
        matchingHandler.handler = handler;
        matchingHandler.urlParams = fromPairs(compact(handlerUrlParts.map((value, index) => {
          return value.startsWith(':') ? [value.substring(1), urlParts[index]] : undefined;
        })));
      }
    });

    return matchingHandler;
  }

  private registerHandler(method: KuMockApiMethods, url: string, delay?: number): KuMockApiHandler {
    const regUrl = this.config.apiUrl() + url;
    const mockHttp = new KuMockApiHandler(regUrl, delay);
    this.handlers[method].set(regUrl, mockHttp);
    return mockHttp;
  }

  onGet(url: string, delay?: number): KuMockApiHandler {
    return this.registerHandler('GET', url, delay);
  }

  onPost(url: string, delay?: number): KuMockApiHandler {
    return this.registerHandler('POST', url, delay);
  }

  onPut(url: string, delay?: number): KuMockApiHandler {
    return this.registerHandler('PUT', url, delay);
  }

  onPatch(url: string, delay?: number): KuMockApiHandler {
    return this.registerHandler('PATCH', url, delay);
  }

  onDelete(url: string, delay?: number): KuMockApiHandler {
    return this.registerHandler('DELETE', url, delay);
  }

}
