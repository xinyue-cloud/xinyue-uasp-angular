import { Component, OnInit }   from '@angular/core';
import { KuBreadcrumbService } from '@xinyue/uasp';

@Component({
  selector   : 'uasp-task-manage',
  templateUrl: './task-manage.component.html',
})
export class TaskManageComponent implements OnInit {

  constructor(
    private breadcrumb: KuBreadcrumbService,
  ) {
    breadcrumb.setItems({
      title: '任务中心',
      items: [
        { label: '任务中心', routerLink: ['uasp/tasks'] },
      ],
    });
  }

  ngOnInit(): void {
  }

}
