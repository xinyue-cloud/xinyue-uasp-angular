import { Component, OnInit }   from '@angular/core';
import { KuBreadcrumbService } from '@xinyue/uasp';

@Component({
  selector   : 'uasp-profile-manage',
  templateUrl: './profile-manage.component.html',
})
export class ProfileManageComponent implements OnInit {

  constructor(
    private breadcrumb: KuBreadcrumbService,
  ) {
    breadcrumb.setItems({
      title: '个人中心',
      items: [
        { label: '个人中心', routerLink: ['uasp/profile'] },
      ],
    });
  }

  ngOnInit(): void {
  }

}
