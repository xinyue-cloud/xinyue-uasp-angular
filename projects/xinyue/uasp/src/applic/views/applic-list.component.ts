import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectItem }                              from '@xinyue/core';

import { TableOption }                 from '../../shared';
import { ApplicVo }                    from '../models';
import { ApplicClient, ApplicService } from '../services';

@Component({
  selector   : 'uasp-applic-list',
  templateUrl: './applic-list.component.html',
})
export class ApplicListComponent implements OnInit {

  // query
  statusItems: SelectItem[];
  searchText = '';
  statusValue = '';

  // table
  option = new TableOption();

  // event
  @Output() onCreate: EventEmitter<any> = new EventEmitter();
  @Output() onView: EventEmitter<ApplicVo> = new EventEmitter();

  constructor(
    private applicClient: ApplicClient,
    private applicService: ApplicService,
  ) {
    this.statusItems = applicService.statusItems;
    this.option.onReloadData = () => {
      this.reloadData();
    };
  }

  ngOnInit(): void {
  }

  reloadData(): void {
    this.applicClient.queryPage({
      page   : this.option.page,
      limit  : this.option.limit,
      orderby: this.option.orderby,
    }, {
      searchText: this.searchText,
      status    : this.statusValue,
    })?.subscribe(httpResult => {
      this.option.dataSource = httpResult.data.rows;
      this.option.totalRecords = httpResult.data.totals;
    });
  }

  doCreate() {
    this.onCreate.emit();
  }

  doView(row: ApplicVo) {
    this.onCreate.emit(row);
  }
}
