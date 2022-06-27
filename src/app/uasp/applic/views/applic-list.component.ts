import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { KuEventService, SelectItem }                                 from '@xinyue/core';

import { DATA_STATUS, TableOption }    from '@xinyue/uasp';
import { ApplicClient, ApplicService } from '../services';
import { cloneDeep }                   from 'lodash-es';
import { ApplicVo }                    from '../models';
import {
  APPLIC_MAIN_TAB_CREATE,
  APPLIC_LIST_QUERY,
  APPLIC_MAIN_TAB_VIEW,
}                                      from '../event.types';

@Component({
  selector   : 'uasp-applic-list',
  templateUrl: './applic-list.component.html',
})
export class ApplicListComponent implements OnInit {

  // query
  statusItems: SelectItem[];
  query = {
    searchText : '',
    statusValue: '',
  }

  // table
  option = new TableOption<ApplicVo>();

  constructor(
    private cdf: ChangeDetectorRef,
    private applicClient: ApplicClient,
    private applicService: ApplicService,
    private eventService: KuEventService,
  ) {
    this.statusItems = cloneDeep(DATA_STATUS);
    this.option.onReloadData = () => {
      this.onReload();
    };
    eventService.subscribe(args => {
      if (args.type === APPLIC_LIST_QUERY) {
        this.onReload();
      }
    });
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

  onView(row: ApplicVo) {
    this.eventService.emit({
      type   : APPLIC_MAIN_TAB_VIEW,
      payload: {
        title      : row.name,
        businessKey: row.appId,
        active     : 0,
      },
    });
  }
}
