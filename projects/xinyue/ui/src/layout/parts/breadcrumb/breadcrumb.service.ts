import { Injectable }            from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { KuBreadcrumb } from './breadcrumb.types';

@Injectable({
  providedIn: 'root',
})
export class KuBreadcrumbService {

  private itemSubject = new Subject<KuBreadcrumb>();
  item$ = this.itemSubject.asObservable();

  setItems(items: KuBreadcrumb): void {
    this.itemSubject.next(items);
  }

  subscribe(next: (value: KuBreadcrumb) => void): Subscription {
    return this.item$.subscribe(next);
  }

}
