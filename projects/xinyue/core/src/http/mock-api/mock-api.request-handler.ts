import { HttpRequest }                from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { KuMockApiReplyCallback, KuMockApiResponse } from './mock-api.types';

export class KuMockApiHandler {

  request!: HttpRequest<any>;
  urlParams!: { [key: string]: string; };

  private reply: KuMockApiReplyCallback = undefined;
  private replyCount = 0;
  private replied = 0;

  constructor(
    public url: string,
    public delay?: number,
  ) {
  }

  get response(): Observable<KuMockApiResponse> {

    if (this.replyCount > 0 && this.replyCount <= this.replied) {
      return throwError(() => new Error('已达到执行限制！'));
    }
    if (!this.reply) {
      return throwError(() => new Error('响应回调函数不存在！'));
    }
    if (!this.request) {
      return throwError(() => new Error('请求不存在！'));
    }
    this.replied++;

    const replyResult = this.reply(this.request, this.urlParams);
    if (replyResult instanceof Observable) {
      return replyResult;
    }
    return of(replyResult);
  }

  onReply(callback: KuMockApiReplyCallback): void {
    this.reply = callback;
  }

  onReplyCount(count: number): void {
    this.replyCount = count;
  }

}
