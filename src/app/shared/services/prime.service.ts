import { Injectable }    from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class PrimeService {

  constructor() {
  }

  public tableOrderBy(event: LazyLoadEvent): any {
    let orderby = '';
    if (event.multiSortMeta) {
      for (let i in event.multiSortMeta) {
        orderby += event.multiSortMeta[i].field + (event.multiSortMeta[i].order === 1 ? '+desc' : '');
      }
    } else if (event.sortField) {
      orderby = event.sortField + (event.sortOrder === 1 ? '+desc' : '');
    }
    return orderby;
  }

}
