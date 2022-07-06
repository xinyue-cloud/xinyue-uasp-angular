import { Component, OnInit, Output }   from '@angular/core';
import { ApplicClient, ApplicManager } from '../services';
import { ListState }                   from '../types';

@Component({
  selector   : 'uasp-applic-list',
  templateUrl: './applic-list.component.html',
})
export class ApplicListComponent implements OnInit {

  state!: ListState;

  constructor(
    private client: ApplicClient,
    private manager: ApplicManager,
  ) {
    this.state = manager.list;
  }

  ngOnInit(): void {
    this.state.option.onReload = () => {
      this.onReload();
    };
  }

  onReload(): void {
    this.client.queryPage({
      ...this.state.option.params,
    }, {
      ...this.state.query,
    })?.subscribe(httpResult => {
      this.state.option.dataSource = httpResult.data.rows;
      this.state.option.totalRecords = httpResult.data.totals;
    });
  }

  onCreate() {
    this.manager.create();
  }

  onView(row: any) {
    this.manager.view(row);
  }
}
