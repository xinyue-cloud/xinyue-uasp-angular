import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectItem }                                                                from '@xinyue/core';

import { TableOption }                 from '../../shared';
import { ApplicVo }                    from '../models';
import { ApplicClient, ApplicService } from '../services';

@Component({
  selector   : 'uasp-applic-list',
  templateUrl: './applic-list.component.html',
})
export class ApplicListComponent implements OnInit, AfterViewInit {

  // query
  statusItems: SelectItem[];
  query = {
    searchText : '',
    statusValue: '',
  }

  // table
  option = new TableOption<ApplicVo>();

  // event
  @Output() onCreate: EventEmitter<any> = new EventEmitter();
  @Output() onView: EventEmitter<ApplicVo> = new EventEmitter();

  constructor(
    private cdf: ChangeDetectorRef,
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

  ngAfterViewInit(): void {
    this.cdf.detectChanges();
  }

  reloadData(): void {

    console.log(this.query);

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
    this.onView.emit(row);
  }
}
