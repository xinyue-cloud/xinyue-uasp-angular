import { Component, OnInit } from '@angular/core';

import { KuBreadcrumbService } from '@xinyue/uasp';

@Component({
  selector   : 'app-blank',
  templateUrl: './blank.component.html',
})
export class BlankComponent implements OnInit {

  constructor(
    private breadcrumbService: KuBreadcrumbService,
  ) {
    breadcrumbService.setItems({
      title: '空白页',
      items: [
        { label: '空白页', routerLink: ['blank'] },
      ],
    });
  }

  ngOnInit(): void {
  }

}
