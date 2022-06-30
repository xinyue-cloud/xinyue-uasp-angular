import { Component, OnInit }   from '@angular/core';
import { KuBreadcrumbService } from '@xinyue/uasp';

@Component({
  selector   : 'uasp-func-manage',
  templateUrl: './func-manage.component.html',
})
export class FuncManageComponent implements OnInit {

  constructor(
    private breadcrumb: KuBreadcrumbService,
  ) {
    breadcrumb.setItems({
      title: '模块菜单',
      items: [
        { label: '模块菜单', routerLink: ['uasp/module'] },
      ],
    });
  }

  ngOnInit(): void {
  }

}
