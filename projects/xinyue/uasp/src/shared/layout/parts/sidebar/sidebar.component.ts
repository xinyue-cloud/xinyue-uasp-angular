import {
  Component, Input,
  AfterContentInit, ContentChildren,
  OnInit, QueryList,
  TemplateRef,
}                                 from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { KuContentTemplate, KuMenuItem } from '@xinyue/ui';

import { KuBrand }         from './brand.types';
import { KuLayoutService } from '../../services';
import { KuMenuService }   from '../../../services';

@Component({
  selector   : 'ku-layout-sidebar',
  templateUrl: './sidebar.component.html',
})
export class KuSidebarComponent implements OnInit, AfterContentInit {

  get sidebarMenus(): KuMenuItem[] {
    return this.menuService.sidebarMenus;
  }

  @Input() brand!: KuBrand;
  @Input() navFlat!: boolean;
  @Input() navCompact!: boolean;
  @Input() navLegacy!: boolean;
  @Input() navChildIndent!: boolean;
  @Input() navHideOnCollapse!: boolean;

  currentMenu!: KuMenuItem;
  focusin!: boolean;

  @ContentChildren(KuContentTemplate) templates!: QueryList<any>;
  brandTemplate!: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    public layout: KuLayoutService,
    public menuService: KuMenuService,
  ) {
    route.url.subscribe(url => {
      console.info('KtSidebarComponent -> this.route -> url', url);
    });
  }

  ngOnInit(): void {
    // console.info('KtSidebarComponent -> this.route', this.route);
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item: KuContentTemplate) => {
      switch (item.getType()) {
        case 'brand':
          this.brandTemplate = item.template;
          break;
      }
    });
  }

  public clickMenu(item: KuMenuItem): void {

    if (item.items != null && item.items.length > 0) {
      item.isOpen = !item.isOpen;
    } else if (this.currentMenu !== item) {
      this.menuService.cleanActiveMenu();
      this.menuService.makeSetActive(item);
    }
    this.currentMenu = item;
  }

}

@Component({
  selector   : '[kNavbarItem]',
  templateUrl: './sidebar-item.component.html',
})
export class KuSidebarItemComponent implements OnInit {

  @Input() item!: KuMenuItem;

  constructor(
    public router: Router,
    public sidebar: KuSidebarComponent,
  ) {
  }

  ngOnInit(): void {
  }

  onFocusin(): void {
    this.sidebar.focusin = true;
  }

  onFocusout(): void {
    this.sidebar.focusin = false;
  }

  itemClick(event: Event): boolean {
    if (this.item.items != null && this.item.items.length > 0) {
      this.item.isOpen = !this.item.isOpen;
    } else {
      this.sidebar.clickMenu(this.item);
    }
    return false;
  }
}
