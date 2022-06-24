import { Component, OnInit }            from '@angular/core';
import { KuBreadcrumbService, MainTab } from '@xinyue/uasp';
import { KuEventService }               from '@xinyue/core';

import {
  APPLIC_MAIN_TAB_CREATE, APPLIC_MAIN_TAB_VIEW,
  APPLIC_MAIN_TAB_CLOSE_ACTIVE,
  APPLIC_MAIN_TAB_NEW_MODIFY,
  APPLIC_MAIN_TAB_NEW_CLOSE, APPLIC_MAIN_TAB_MODIFY,
} from './event.types';

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
      if (args.type === APPLIC_MAIN_TAB_CLOSE_ACTIVE) {
        this.onMainTabClose(this.mainTabIndex);
      } else if (args.type === APPLIC_MAIN_TAB_MODIFY) {
        this.onMainTabModify(args.payload);
      } else if (args.type === APPLIC_MAIN_TAB_NEW_MODIFY) {
        this.onMainTabNewModify(args.payload);
      } else if (args.type === APPLIC_MAIN_TAB_NEW_CLOSE) {
        this.onMainTabCloseNew();
      } else if (args.type === APPLIC_MAIN_TAB_CREATE) {
        this.onCreate();
      } else if (args.type === APPLIC_MAIN_TAB_VIEW) {
        this.onView(args.payload);
      }
    });
  }

  ngOnInit(): void {
  }

  onMainTabClick(index: number): void {
    this.mainTabIndex = index;
  }

  onMainTabClose(index: number): void {
    this.mainTabs.splice(index - 1, 1);
    this.mainTabIndex = 0;
  }

  onMainTabCloseNew(): void {
    let rows = this.mainTabs.filter(x => x.isNew);
    if (rows.length > 0) {
      this.onMainTabClose(this.mainTabs.indexOf(rows[0]) + 1);
    }
  }

  onMainTabNewModify(tab: MainTab): void {
    let rows = this.mainTabs.filter(x => x.isNew);
    if (rows.length > 0) {
      rows[0].isNew = false;
      rows[0].businessKey = tab.businessKey;
      rows[0].title = tab.title;
    }
  }

  onMainTabModify(tab: MainTab): void {
    let rows = this.mainTabs.filter(x => x.businessKey === tab.businessKey);
    if (rows.length > 0) {
      rows[0].title = tab.title;
    }
  }

  onDetailTabClick(index: number) {
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
