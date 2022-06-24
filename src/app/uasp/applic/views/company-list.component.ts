import { Component, Input, OnInit } from '@angular/core';
import { MainTab }                  from '@xinyue/uasp';

@Component({
  selector   : 'uasp-company-list',
  templateUrl: './company-list.component.html',
})
export class CompanyListComponent implements OnInit {

  @Input() entry!: MainTab;

  constructor() {
  }

  ngOnInit(): void {
  }

}
