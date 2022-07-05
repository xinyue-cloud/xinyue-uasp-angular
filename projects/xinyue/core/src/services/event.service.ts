import { EventEmitter, Injectable } from '@angular/core';
import { Subscription }             from 'rxjs';

export interface KuEventArgs {
  type: string,
  payload?: any
}

@Injectable({
  providedIn: 'root',
})
export class KuEventService {

  private subject: EventEmitter<KuEventArgs> = new EventEmitter<any>();

  constructor() {
  }

  public subscribe(next?: (value: KuEventArgs) => void): Subscription {
    return this.subject.subscribe(next);
  }

  public emit(value: KuEventArgs): void {
    this.subject.emit(value);
  }

}
