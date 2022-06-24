import { Component, Input, OnInit } from '@angular/core';
import { MainTab }                  from '@xinyue/uasp';

@Component({
  selector   : 'uasp-tenant-list',
  templateUrl: './tenant-list.component.html',
})
export class TenantListComponent implements OnInit {

  @Input() entry!: MainTab;

  constructor() {
  }

  ngOnInit(): void {
  }

}
