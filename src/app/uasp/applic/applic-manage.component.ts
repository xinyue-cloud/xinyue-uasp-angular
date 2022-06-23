import { Component, OnInit }            from '@angular/core';
import { KuBreadcrumbService, MainTab } from '@xinyue/uasp';

import { EventService } from '../../shared/services/event.service';

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
    private eventService: EventService,
  ) {
    console.info('ApplicManageComponent -> constructor');
    breadcrumb.setItems({
      title: '应用目录',
      items: [
        { label: '应用目录', routerLink: ['uasp/applic'] },
      ],
    });
    eventService.subscribe(args => {
      if (args.type === 'APPLIC_CLOSE') {
        this.onTabClose(args.payload);
      } else if (args.type === 'APPLIC_OPEN') {
        this.onAnewOpen(args.payload);
      }
    })
  }

  ngOnInit(): void {
  }

  tabClick(index: number): void {
    this.mainTabIndex = index;
  }

  tabClose(index: number): void {
    this.mainTabs.splice(index - 1, 1);
    this.mainTabIndex = 0;
  }

  onAnewOpen(tab: MainTab): void {
    this.onTabClose(tab);
    this.onView(tab);
  }

  onTabClose(tab: MainTab): void {
    let rows = this.mainTabs.filter(x => x.businessKey === tab.businessKey);
    if (rows.length > 0) {
      this.tabClose(this.mainTabs.indexOf(rows[0]) + 1);
    }
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
