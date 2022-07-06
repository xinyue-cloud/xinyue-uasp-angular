import { Component, OnInit }                            from '@angular/core';
import { KuBreadcrumbService }                          from '@xinyue/uasp';
import { SweetAlertResult }                             from 'sweetalert2';
import { KuAlertService, KuEventService, KuTipService } from '@xinyue/core';
import {
  FUNC_FORM_DENY_CLOSE, FUNC_FORM_SAVE_CLOSE,
  FUNC_MAIN_TAB_CLOSE_ACTIVE, FUNC_MAIN_TAB_CREATE,
  FUNC_MAIN_TAB_MODIFY, FUNC_MAIN_TAB_NEW_CLOSE,
  FUNC_MAIN_TAB_NEW_MODIFY, FUNC_MAIN_TAB_SHOW_HOME, FUNC_MAIN_TAB_VIEW,
}                                                       from './event.types';
import { ManageTab }                                    from '../../shared';

@Component({
  selector   : 'uasp-func-manage',
  templateUrl: './func-manage.component.html',
})
export class FuncManageComponent implements OnInit {

  // tabs
  mainTabIndex = 0;
  mainTabs: ManageTab<any>[] = [];

  constructor(
    private breadcrumb: KuBreadcrumbService,
    private eventService: KuEventService,
    private alertService: KuAlertService,
    private tipService: KuTipService,
  ) {
    breadcrumb.setItems({
      title: '模块菜单',
      items: [
        { label: '模块菜单', routerLink: ['uasp/module'] },
      ],
    });
    eventService.subscribe(event => {
      if (event.type === FUNC_MAIN_TAB_SHOW_HOME) {
        this.onManageTabClickHome();
      } else if (event.type === FUNC_MAIN_TAB_CLOSE_ACTIVE) {
        this.onManageTabClose(event.payload);
      } else if (event.type === FUNC_MAIN_TAB_MODIFY) {
        this.onManageTabModify(event.payload);
      } else if (event.type === FUNC_MAIN_TAB_NEW_MODIFY) {
        this.onManageTabNewModify(event.payload);
      } else if (event.type === FUNC_MAIN_TAB_NEW_CLOSE) {
        this.onManageTabCloseNew();
      } else if (event.type === FUNC_MAIN_TAB_CREATE) {
        this.onCreate(event.payload);
      } else if (event.type === FUNC_MAIN_TAB_VIEW) {
        this.onView(event.payload);
      }
    });
  }

  ngOnInit(): void {
  }

  onManageTabClickHome(): void {
    this.mainTabIndex = 0;
  }

  onManageTabClickTitle(tab: ManageTab<any>): void {
    this.mainTabIndex = this.mainTabs.indexOf(tab) + 1;
  }

  onManageTabClickClose(tab: ManageTab<any>): void {

    if (tab.modified) {
      this.alertService.custom({
        confirmButtonText: '保存',
        denyButtonText   : '不保存',
        cancelButtonText : '取消',
      }, '该记录数据已经修改，是否需要保存？', '选择关闭方式')
        .then((result: SweetAlertResult) => {
          console.info('onManageTabClose -> Confirm -> result: ', result);
          if (result.isConfirmed) {
            this.eventService.emit({
              type   : FUNC_FORM_SAVE_CLOSE,
              payload: tab,
            });
          } else if (result.isDenied) {
            this.eventService.emit({
              type   : FUNC_FORM_DENY_CLOSE,
              payload: tab,
            });
          }
        });
    } else {
      this.onManageTabClose(tab);
    }
  }

  onManageTabClose(tab: ManageTab<any>): void {
    let index = this.mainTabs.indexOf(tab) + 1;
    this.mainTabs.splice(index - 1, 1);
    this.mainTabIndex = 0;
  }

  onManageTabCloseNew(): void {
    let rows = this.mainTabs.filter(x => x.isNew);
    if (rows.length > 0) {
      this.onManageTabClose(rows[0]);
    }
  }

  onManageTabNewModify(tab: ManageTab<any>): void {
    let rows = this.mainTabs.filter(x => x.isNew);
    if (rows.length > 0) {
      rows[0].isNew = false;
      rows[0].businessKey = tab.businessKey;
      rows[0].title = tab.title;
    }
  }

  onManageTabModify(tab: ManageTab<any>): void {
    let rows = this.mainTabs.filter(x => x.businessKey === tab.businessKey);
    if (rows.length > 0) {
      rows[0].title = tab.title;
    }
  }

  onCreate(payload: any): void {
    let rows = this.mainTabs.filter(x => x.isNew);
    if (rows.length > 0) {
      this.mainTabIndex = this.mainTabs.indexOf(rows[0]) + 1;
      this.tipService.warning('只允许同时新增一个记录。')
    } else {
      let row = {
        title : '[未命名项]',
        isNew : true,
        active: 0,
        data  : {
          ...payload,
        },
      };
      this.mainTabs.push(row);
      this.mainTabIndex = this.mainTabs.indexOf(row) + 1;
    }
  }

  onView(tab: ManageTab<any>): void {
    let rows = this.mainTabs.filter(x => x.businessKey === tab.businessKey);
    if (rows.length > 0) {
      this.mainTabIndex = this.mainTabs.indexOf(rows[0]) + 1;
    } else {
      this.mainTabs.push(tab);
      this.mainTabIndex = this.mainTabs.indexOf(tab) + 1;
    }
  }
}
