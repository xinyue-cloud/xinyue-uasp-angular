import { Component, OnInit }   from '@angular/core';
import { KuBreadcrumbService } from '@xinyue/uasp';

import { ApplicManager }                     from './services';
import { ApplicManageState, ApplicTabState } from './types';
import { KuAlertService }                    from '@xinyue/core';

@Component({
  selector   : 'uasp-applic-manage',
  templateUrl: './applic-manage.component.html',
})
export class ApplicManageComponent implements OnInit {

  state!: ApplicManageState;

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

  showTab(tab: ApplicTabState) {
    if (!this.manager.tryShowTab(tab.businessKey!)) {
      this.manager.appendTab(tab);
    }
  }

  tryCloseTab(tab: ApplicTabState) {
    this.manager.tryCloseTab(tab);
  }

}
