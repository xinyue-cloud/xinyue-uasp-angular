import { Component, OnInit } from '@angular/core';
import { TableOption }       from '../../shared';

@Component({
  selector   : 'uasp-applic-list',
  templateUrl: './applic-list.component.html',
})
export class ApplicListComponent implements OnInit {

  // query
  searchText = '';
  statusList = [];

  // table
  tableOption = new TableOption();

  constructor() {
  }

  ngOnInit(): void {
  }

}
