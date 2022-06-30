import { DOCUMENT }                            from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  QueryList, TemplateRef,
}                                              from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';

import { KuConfigService, KuLoggerService } from '@xinyue/core';
import { KuMenuItem, KuContentTemplate }    from '@xinyue/ui';

import { KuCopyright, KuBrand }              from '../../parts';
import { KuSidebarService, KuLayoutService } from '../../services';
import { KuAuthService }                     from '../../../services';
import { KuLoginUser }                       from '../../../models';
import { stringify }                         from '@angular/compiler/src/util';
import { KuMenuService }                     from '../../../services/menu.service';

const CLASS_LAYOUT = [
  'sidebar-mini',
  'layout-fixed',
  'layout-footer-fixed',
  'layout-navbar-fixed',
  'pace-primary',
];

@Component({
  selector   : 'ku-admin-layout',
  templateUrl: './admin-layout.component.html',
})
export class KuAdminLayoutComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {

  copyright: KuCopyright = {
    year    : '2021',
    homeUrl : 'https://www.xinyue.cloud',
    homeText: 'XinYue UASP',
    version : '1.0.0',
  };
  brand: KuBrand = {
    logoClass : '',
    logoStyles: undefined,
    logoUrl   : 'assets/img/AdminLTELogo.png',
    logoAlt   : 'AdminLTE Logo',
    brandText : '应用开发支撑平台',
  };

  body: HTMLElement;

  @ContentChildren(KuContentTemplate)
  templates!: QueryList<any>;
  breadcrumbTemplate!: TemplateRef<any>;
  headerTemplate!: TemplateRef<any>;


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private logger: KuLoggerService,
    private sidebar: KuSidebarService,
    private config: KuConfigService,
    private authService: KuAuthService,
    private menuService: KuMenuService,
    public layout: KuLayoutService,
  ) {

    this.body = document.body;

    // 设备用户信息权限数据。
    const loginUser: KuLoginUser = activeRouter.snapshot.data['data'];
    authService.setLoginUser(loginUser);

    // 设置主菜单，并标记当前路由为活动菜单项.
    const routeUrl: string = router.routerState.snapshot.url;
    menuService.setMainMenus(loginUser.mainMenus, routeUrl);

    let copyright = config.get('copyright');
    if (!!copyright) {
      this.copyright = copyright;
    }

    let brand = config.get('brand');
    if (!!brand) {
      this.brand = brand;
    }
  }

  get mainMenus(): KuMenuItem[] {
    return this.menuService.mainMenus;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any): void {
    this.sidebar.autoCollapse(true);
  }

  ngOnInit(): void {
    CLASS_LAYOUT.forEach((cls) => {
      if (!this.body.classList.contains(cls)) {
        this.body.classList.add(cls);
      }
    });
    this.layout.navCompact = true;
    this.layout.navFlat = true;
  }

  ngAfterViewInit(): void {
    this.sidebar.remember();
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item: KuContentTemplate) => {
      switch (item.getType()) {
        case 'breadcrumb':
          this.breadcrumbTemplate = item.template;
          break;
        case 'header':
          this.headerTemplate = item.template;
          break;
      }
    });
  }

  ngOnDestroy(): void {
    CLASS_LAYOUT.forEach((cls) => {
      if (this.body.classList.contains(cls)) {
        this.body.classList.remove(cls);
      }
    });
  }

  onSidebarCollapse(): void {
    this.sidebar.collapse();
  }
}
