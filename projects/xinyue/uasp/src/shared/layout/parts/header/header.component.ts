import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';

import { KuContentTemplate }                 from '@xinyue/ui';
import { KuLayoutService, KuSidebarService } from '../../services';
import { KuAuthService }                     from '../../../services';

@Component({
  selector   : 'ku-layout-header',
  templateUrl: './header.component.html',
})
export class KuHeaderComponent implements OnInit, AfterContentInit {

  @Input() custom = false;

  @ContentChildren(KuContentTemplate)
  templates!: QueryList<any>;
  leftTemplate!: TemplateRef<any>;
  rightTemplate!: TemplateRef<any>;
  isFullscreen = false;

  constructor(
    public sidebar: KuSidebarService,
    public layout: KuLayoutService,
    public account: KuAuthService,
  ) {
  }

  ngOnInit(): void {
  }

  onSidebarToggle(): void {
    this.sidebar.toggle();
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item: KuContentTemplate) => {
      switch (item.getType()) {
        case 'left':
          this.leftTemplate = item.template;
          break;
        case 'right':
          this.rightTemplate = item.template;
          break;
      }
    });
  }

  onControlToggle(): void {
    this.layout.controlOpened = !this.layout.controlOpened;
  }
}
