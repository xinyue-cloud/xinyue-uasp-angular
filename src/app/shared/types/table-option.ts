import { tableOrderBy } from '../utils';

export class TableOption<T> {

  dataSource: T[] = [];
  totalRecords = 0;
  loading = false;
  params = {
    page   : 0,
    limit  : 10,
    orderby: '',
  };

  get limit(): number {
    return this.params.limit;
  }

  set limit(value: number) {
    this.params.limit = value;
  }

  onReload!: (event: any) => void;

  onLazyLoad(event: any): void {
    this.params.limit = event.rows;
    this.params.page = event.first / event.rows;
    this.params.orderby = tableOrderBy(event);
    this.onReload(event);
  }
}
