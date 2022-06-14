import { DOCUMENT }                                                          from "@angular/common";
import { AfterViewInit, Component, HostListener, Inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute }                                                    from "@angular/router";

import { KuLoggerService } from "@xinyue/core";
import {
  KuBrand,
  KuCopyright,
  KuLayoutService,
  KuMenuItem,
  KuSidebarService,
}                          from "@xinyue/ui";

const CLASS_LAYOUT = [
  "sidebar-mini",
  "layout-fixed",
  "layout-footer-fixed",
  "layout-navbar-fixed",
  "pace-primary",
];

@Component({
  selector   : "msp-admin-layout",
  templateUrl: "./admin-layout.component.html",
})
export class AdminLayoutComponent implements OnInit, OnDestroy, AfterViewInit {

  navigation!: {
    sidebar: KuMenuItem[];
    header: KuMenuItem[];
  };
  copyright: KuCopyright = {
    year    : "2021",
    homeUrl : "https://www.xinyue.cloud",
    homeText: "XinYue 微应用支撑平台",
    version : "1.0.0",
  };
  brand: KuBrand = {
    logoClass : "",
    logoStyles: undefined,
    logoUrl   : "assets/img/AdminLTELogo.png",
    logoAlt   : "AdminLTE Logo",
    brandText : "微应用支撑平台",
  };

  body: HTMLElement;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private activatedRoute: ActivatedRoute,
    private logger: KuLoggerService,
    private sidebar: KuSidebarService,
    public layout: KuLayoutService,
  ) {
    this.body = document.body;
    activatedRoute.data.subscribe(data => {
      this.navigation = data['dataset'].navigation;
    });
  }

  @HostListener("window:resize", ["$event"])
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
