import { Component, OnInit }              from '@angular/core';
import { KuBreadcrumbService, MainTab }   from '@xinyue/uasp';
import { KuAlertService, KuEventService } from '@xinyue/core';

import {
  APPLIC_FORM_DENY_CLOSE,
  APPLIC_FORM_SAVE_CLOSE,
  APPLIC_MAIN_TAB_CLOSE_ACTIVE,
  APPLIC_MAIN_TAB_CREATE,
  APPLIC_MAIN_TAB_MODIFY,
  APPLIC_MAIN_TAB_NEW_CLOSE,
  APPLIC_MAIN_TAB_NEW_MODIFY,
  APPLIC_MAIN_TAB_VIEW,
}                           from './event.types';
import { SweetAlertResult } from 'sweetalert2';

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
    private eventService: KuEventService,
    private alertService: KuAlertService,
  ) {
    breadcrumb.setItems({
      title: '应用目录',
      items: [
        { label: '应用目录', routerLink: ['uasp/applic'] },
      ],
    });
    eventService.subscribe(args => {
      if (args.type === APPLIC_MAIN_TAB_CLOSE_ACTIVE) {
        this.onMainTabClose(args.payload);
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

  onMainTabClickHome(): void {
    this.mainTabIndex = 0;
  }

  onMainTabClickTitle(tab: MainTab): void {
    this.mainTabIndex = this.mainTabs.indexOf(tab) + 1;
  }

  onMainTabClickClose(tab: MainTab): void {

    if (tab.modified) {
      this.alertService.custom({
        confirmButtonText: '保存',
        denyButtonText   : '不保存',
        cancelButtonText : '取消',
      }, '该记录数据已经修改，是否需要保存？', '选择关闭方式')
        .then((result: SweetAlertResult) => {
          console.info('onMainTabClose -> Confirm -> result: ', result);
          if (result.isConfirmed) {
            this.eventService.emit({
              type   : APPLIC_FORM_SAVE_CLOSE,
              payload: tab,
            });
          } else if (result.isDenied) {
            this.eventService.emit({
              type   : APPLIC_FORM_DENY_CLOSE,
              payload: tab,
            });
          }
        });
    } else {
      this.onMainTabClose(tab);
    }
  }

  onMainTabClose(tab: MainTab): void {
    let index = this.mainTabs.indexOf(tab) + 1;
    this.mainTabs.splice(index - 1, 1);
    this.mainTabIndex = 0;
  }

  onMainTabCloseNew(): void {
    let rows = this.mainTabs.filter(x => x.isNew);
    if (rows.length > 0) {
      this.onMainTabClose(rows[0]);
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

  onCreate(): void {
    let rows = this.mainTabs.filter(x => x.isNew);
    if (rows.length > 0) {
      this.mainTabIndex = this.mainTabs.indexOf(rows[0]) + 1;
    } else {
      let row = { title: '[创建新应用]', isNew: true, active: 0 };
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
