import { Component, Input, OnInit } from '@angular/core';
import { ManageTab }                from '../../../shared';

@Component({
  selector   : 'uasp-company-list',
  templateUrl: './company-list.component.html',
})
export class CompanyListComponent implements OnInit {

  @Input() entry!: ManageTab<any>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
