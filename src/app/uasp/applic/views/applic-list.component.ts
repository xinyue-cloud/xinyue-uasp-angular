import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { KuEventService, SelectItem }                                 from '@xinyue/core';

import { DATA_STATUS, MainTab, TableOption } from '@xinyue/uasp';
import { ApplicClient, ApplicService }       from '../services';
import { cloneDeep }                         from 'lodash-es';
import { ApplicVo }                          from '../models';
import {
  EVENT_APPLIC_CLICK_QUERY,
  EVENT_APPLIC_CLOSE_ACTIVE,
  EVENT_APPLIC_NEW_ANEW_OPEN,
  EVENT_APPLIC_NEW_CLOSE,
}                                            from '../events';

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
  option = new TableOption<any>();

  // event
  @Output() onCreate: EventEmitter<any> = new EventEmitter();
  @Output() onView: EventEmitter<MainTab> = new EventEmitter();

  constructor(
    private cdf: ChangeDetectorRef,
    private applicClient: ApplicClient,
    private applicService: ApplicService,
    private eventService: KuEventService,
  ) {
    this.statusItems = cloneDeep(DATA_STATUS);
    this.option.onReloadData = () => {
      this.reloadData();
    };
    eventService.subscribe(args => {
      if (args.type === EVENT_APPLIC_CLICK_QUERY) {
        this.reloadData();
      }
    });
  }

  ngOnInit(): void {
  }

  reloadData(): void {

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

  doCreate() {
    this.onCreate.emit();
  }

  doView(row: ApplicVo) {
    this.onView.emit({
      title      : row.name,
      businessKey: row.appId,
    });
  }
}
