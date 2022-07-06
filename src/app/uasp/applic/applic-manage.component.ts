import { Component, OnInit }   from '@angular/core';
import { KuBreadcrumbService } from '@xinyue/uasp';

import { ApplicManager }         from './services';
import { ManageState, TabState } from './types';
import { SweetAlertResult }      from 'sweetalert2';
import { KuAlertService }        from '@xinyue/core';

@Component({
  selector   : 'uasp-applic-manage',
  templateUrl: './applic-manage.component.html',
})
export class ApplicManageComponent implements OnInit {

  state!: ManageState;

  constructor(
    private breadcrumb: KuBreadcrumbService,
    private manager: ApplicManager,
    private alert: KuAlertService,
  ) {
    breadcrumb.setItems({
      title: '应用目录',
      items: [
        { label: '应用目录', routerLink: ['uasp/applic'] },
      ],
    });
    this.state = manager.manage;
  }

  ngOnInit(): void {
  }

  showHome(): void {
    this.manager.showHomeTab();
  }

  showTab(tab: TabState) {
    if (!this.manager.tryShowTab(tab.businessKey!)) {
      this.manager.appendTab(tab);
    }
  }

  tryCloseTab(tab: TabState) {
    if (tab.modified) {
      this.alert.custom({
          confirmButtonText: '保存',
          denyButtonText   : '不保存',
          cancelButtonText : '取消',
        }, '该记录数据已经修改，是否需要保存？', '选择关闭方式',
      ).then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          this.manager.formSubmit.emit({
            tab  : tab,
            close: true,
          });
        } else if (result.isDenied) {
          this.manager.directCloseTab(tab);
        }
      });
    } else {
      this.manager.directCloseTab(tab);
    }
  }

}
