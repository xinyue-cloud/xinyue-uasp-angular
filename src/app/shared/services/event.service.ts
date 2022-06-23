import { EventEmitter, Injectable } from '@angular/core';

export interface EventArgs {
  type: string,
  payload?: any
}

@Injectable({
  providedIn: 'root',
})
export class EventService {

  private subject: EventEmitter<EventArgs> = new EventEmitter<any>();

  constructor() {
  }

  public subscribe(next?: (value: EventArgs) => void): void {
    this.subject.subscribe(next);
  }

  public emit(value: EventArgs): void {
    this.subject.emit(value);
  }

}
