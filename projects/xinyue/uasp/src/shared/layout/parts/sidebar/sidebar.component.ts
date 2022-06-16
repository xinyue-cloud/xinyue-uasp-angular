import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router }                                                              from "@angular/router";

import { KuContentTemplate } from "../../../apis";
import { KuMenuItem }        from "../../../models";
import { KuBrand }           from "./brand.types";
import { KuLayoutService }   from "../../services/layout.service";

@Component({
  selector   : "k-layout-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class KuSidebarComponent implements OnInit, AfterContentInit {

  @Input() set menus(value: KuMenuItem[]) {
    value.forEach(item => {
      this.makeItemParent(item, item.items);
    });
    this._menus = value;
  }

  get menus(): KuMenuItem[] {
    return this._menus;
  }

  @Input() brand!: KuBrand;

  @Input() navFlat!: boolean;
  @Input() navCompact!: boolean;
  @Input() navLegacy!: boolean;
  @Input() navChildIndent!: boolean;
  @Input() navHideOnCollapse!: boolean;

  _menus!: KuMenuItem[];
  currentMenu!: KuMenuItem;
  focusin!: boolean;

  @ContentChildren(KuContentTemplate) templates!: QueryList<any>;
  brandTemplate!: TemplateRef<any>;

  constructor(
    public layout: KuLayoutService,
    private route: ActivatedRoute,
  ) {
    route.url.subscribe(url => {
      console.info("KtSidebarComponent -> this.route -> url", url);
    });
  }

  ngOnInit(): void {
    // console.info('KtSidebarComponent -> this.route', this.route);
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item: KuContentTemplate) => {
      switch (item.getType()) {
        case "brand":
          this.brandTemplate = item.template;
          break;
      }
    });
  }

  private makeItemParent(parent: KuMenuItem, items?: KuMenuItem[]): void {
    if (items != null && items.length > 0) {
      items.forEach(item => {
        item.parent = parent;
        this.makeItemParent(item, item.items);
      });
    }
  }

  public clickMenu(item: KuMenuItem): void {

    if (item.items != null && item.items.length > 0) {
      item.isOpen = !item.isOpen;
    } else if (this.currentMenu !== item) {
      this.cleanOtherActive();
      this.makeSetActive(item);
    }
    this.currentMenu = item;
  }

  private makeSetActive(item: KuMenuItem): void {
    if (item) {
      // 设置当前选中项
      item.active = true;
      if (item.parent) {
        this.makeSetActive(item.parent);
      }
    }
  }

  private cleanOtherActive(): void {
    this.cleanMenuActive(this.menus);
  }

  private cleanMenuActive(items: KuMenuItem[]): void {
    if (items != null && items.length > 0) {
      items.forEach(item => {
        if (item.active) {
          item.active = false;
          if (item.items != null && item.items.length > 0) {
            this.cleanMenuActive(item.items);
          }
        }
      });
    }
  }

}


@Component({
  selector   : "[kNavbarItem]",
  templateUrl: "./sidebar-item.component.html",
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
