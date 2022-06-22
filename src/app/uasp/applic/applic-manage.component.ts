import { Component, OnInit }            from '@angular/core';
import { KuAlertService, KuTipService } from '@xinyue/core';

import { KuBreadcrumbService, MainTab } from '@xinyue/uasp';

import { ApplicService } from './services';
import { ApplicVo }      from './models';

@Component({
  selector   : 'uasp-applic-manage',
  templateUrl: './applic-manage.component.html',
})
export class ApplicManageComponent implements OnInit {

  // tabs
  mainTabIndex = 0;
  mainTabs: MainTab[] = [];

  constructor(
    private breadcrumb: KuBreadcrumbService,
    private tipService: KuTipService,
    private alertService: KuAlertService,
    private applicService: ApplicService,
  ) {
    console.info('ApplicManageComponent -> constructor');
    breadcrumb.setItems({
      title: '应用目录',
      items: [
        { label: '应用目录', routerLink: ['uasp/applic'] },
      ],
    });
  }

  ngOnInit(): void {
  }

  tabClick(index: number): void {
    this.mainTabIndex = index;
  }

  tabClose(index: number): void {
    this.mainTabs.splice(index - 1, 1);
    this.mainTabIndex = 0;
  }

  create(): void {
    let rows = this.mainTabs.filter(x => x.isNew);
    if (rows.length > 0) {
      this.mainTabIndex = this.mainTabs.indexOf(rows[0]) + 1;
    } else {
      let row = { title: '[创建新应用]', isNew: true };
      this.mainTabs.push(row);
      this.mainTabIndex = this.mainTabs.indexOf(row) + 1;
    }
  }

  view(model: ApplicVo): void {
    let rows = this.mainTabs.filter(x => x.businessKey === model.appId);
    if (rows.length > 0) {
      this.mainTabIndex = this.mainTabs.indexOf(rows[0]) + 1;
    } else {
      let row = { title: model.name, businessKey: model.appId };
      this.mainTabs.push(row);
      this.mainTabIndex = this.mainTabs.indexOf(row) + 1;
    }
  }
}
