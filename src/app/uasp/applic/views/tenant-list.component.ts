import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DATA_STATUS, MainTab, TableOption }           from '@xinyue/uasp';
import { KuEventService, SelectItem }                  from '@xinyue/core';
import { cloneDeep }                                   from 'lodash-es';

import { ApplicClient, ApplicService } from '../services';
import { APPLIC_MAIN_TAB_CREATE }      from '../event.types';

@Component({
  selector   : 'uasp-tenant-list',
  templateUrl: './tenant-list.component.html',
})
export class TenantListComponent implements OnInit {

  @Input() entry!: MainTab;

  // query
  statusItems: SelectItem[] = [
    { id: 'V', text: '正常使用' },
    { id: 'I', text: '已经过期' },
  ]
  query = {
    searchText : '',
    statusValue: '',
  }

  // table
  option = new TableOption<any>();

  constructor(
    private cdf: ChangeDetectorRef,
    private applicClient: ApplicClient,
    private applicService: ApplicService,
    private eventService: KuEventService,
  ) {
    this.option.onReloadData = () => {
      this.onReload();
    };
  }

  ngOnInit(): void {
  }

  onReload(): void {

    this.applicClient.queryPage({
      page   : this.option.page,
      limit  : this.option.limit,
      orderby: this.option.orderby,
    }, {
      searchText: this.query.searchText,
      status    : this.query.statusValue,
    })?.subscribe(httpResult => {
      this.option.dataSource = httpResult.data.rows;
      this.option.totalRecords = httpResult.data.totals;
    });
  }

  onCreate() {
    this.eventService.emit({
      type: APPLIC_MAIN_TAB_CREATE,
    });
  }
}
