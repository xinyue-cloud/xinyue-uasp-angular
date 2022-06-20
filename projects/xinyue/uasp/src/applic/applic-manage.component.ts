import { Component, OnInit }            from '@angular/core';
import { KuAlertService, KuTipService } from '@xinyue/core';

import { KuBreadcrumbService } from '../shared';
import { ApplicService }       from './services/applic.service';

@Component({
  selector   : 'uasp-applic-manage',
  templateUrl: './applic-manage.component.html',
})
export class ApplicManageComponent implements OnInit {

  // tabs
  mainTabIndex = 0;
  tabList: {
    title: string,
    isNew: boolean,
    businessKey?: string
  }[] = [];

  constructor(
    private breadcrumb: KuBreadcrumbService,
    private tip: KuTipService,
    private alert: KuAlertService,
    private applicService: ApplicService,
  ) {
    breadcrumb.setItems({
      title: '应用目录',
      items: [
        { label: '应用目录', routerLink: ['msp/apps'] },
      ],
    });
  }

  ngOnInit(): void {
  }

  tabClick(index: number): void {
    this.mainTabIndex = index;
  }

  tabClose(index: number): void {
    this.tabList.splice(index - 1, 1);
    this.mainTabIndex = 0;
  }

  create(): void {
    let rows = this.tabList.filter(x => x.isNew);
    if (rows.length > 0) {
      this.mainTabIndex = this.tabList.indexOf(rows[0]) + 1;
    } else {
      this.tabList.push({
        title: '创建新应用',
        isNew: true,
      });
    }
  }
}
