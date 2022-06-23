import { Component, OnInit }            from '@angular/core';
import { KuBreadcrumbService, MainTab } from '@xinyue/uasp';
import { KuEventService }               from '@xinyue/core';

import {
  EVENT_APPLIC_CLOSE_ACTIVE,
  EVENT_APPLIC_NEW_ANEW_OPEN,
  EVENT_APPLIC_NEW_CLOSE,
} from './events';

@Component({
  selector   : 'uasp-applic-manage',
  templateUrl: './applic-manage.component.html',
})
export class ApplicManageComponent implements OnInit {

  // tabs
  mainTabIndex = 0;
  mainTabs: MainTab[] = [];

  // detail
  detailTabIndex = 0;

  constructor(
    private breadcrumb: KuBreadcrumbService,
    private eventService: KuEventService,
  ) {
    console.info('ApplicManageComponent -> constructor');
    breadcrumb.setItems({
      title: '应用目录',
      items: [
        { label: '应用目录', routerLink: ['uasp/applic'] },
      ],
    });
    eventService.subscribe(args => {
      if (args.type === EVENT_APPLIC_CLOSE_ACTIVE) {
        this.tabCloseIndex(this.mainTabIndex);
      } else if (args.type === EVENT_APPLIC_NEW_ANEW_OPEN) {
        this.mainTabCloseNew();
        this.onView(args.payload);
      } else if (args.type === EVENT_APPLIC_NEW_CLOSE) {
        this.mainTabCloseNew();
      }
    });
  }

  ngOnInit(): void {
  }

  mainTabClick(index: number): void {
    this.mainTabIndex = index;
  }

  tabCloseIndex(index: number): void {
    this.mainTabs.splice(index - 1, 1);
    this.mainTabIndex = 0;
  }

  mainTabCloseNew(): void {
    let rows = this.mainTabs.filter(x => x.isNew);
    if (rows.length > 0) {
      this.tabCloseIndex(this.mainTabs.indexOf(rows[0]) + 1);
    }
  }

  detailTabClick(index: number) {
    this.detailTabIndex = index;
  }

  onCreate(): void {
    let rows = this.mainTabs.filter(x => x.isNew);
    if (rows.length > 0) {
      this.mainTabIndex = this.mainTabs.indexOf(rows[0]) + 1;
    } else {
      let row = { title: '[创建新应用]', isNew: true };
      this.mainTabs.push(row);
      this.mainTabIndex = this.mainTabs.indexOf(row) + 1;
    }
  }

  onView(tab: MainTab): void {
    let rows = this.mainTabs.filter(x => x.businessKey === tab.businessKey);
    if (rows.length > 0) {
      this.mainTabIndex = this.mainTabs.indexOf(rows[0]) + 1;
    } else {
      this.mainTabs.push(tab);
      this.mainTabIndex = this.mainTabs.indexOf(tab) + 1;
    }
  }
}
