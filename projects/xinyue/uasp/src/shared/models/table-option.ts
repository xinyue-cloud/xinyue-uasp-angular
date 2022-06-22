export class TableOption<T> {

  dataSource: T[] = [];
  totalRecords = 0;
  loading = false;
  page = 0;
  limit = 10;
  orderby = '';
  onReloadData!: (event: any) => void;

  onLazyLoad(event: any): void {
    this.limit = event.rows;
    this.page = event.first / event.rows;
    this.orderby = TableOption.$makeOrderBy(event);
    this.onReloadData(event);
  }

  private static $makeOrderBy(event: any) {
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
