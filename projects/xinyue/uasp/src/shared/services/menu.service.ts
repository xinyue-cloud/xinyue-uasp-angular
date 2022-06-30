import { Injectable } from '@angular/core';
import { KuMenuItem } from '@xinyue/ui';

@Injectable({
  providedIn: 'root',
})
export class KuMenuService {

  private _mainMenus: KuMenuItem[] = [];
  private _sidebarMenus: KuMenuItem[] = [];

  get mainMenus(): KuMenuItem[] {
    return this._mainMenus;
  }

  get sidebarMenus(): KuMenuItem[] {
    return this._sidebarMenus;
  }

  constructor() {
  }

  setMainMenus(mainMenus: KuMenuItem[], routeUrl: string): void {
    this._mainMenus = mainMenus;
    this.initMenuStatus(routeUrl);
  }

  setSidebarMenus(menuItems: KuMenuItem[]): void {
    this._sidebarMenus = menuItems;
  }

  private initMenuStatus(routeUrl: string): void {
    // 建立菜单父级关系
    this._mainMenus.forEach(item => {
      this.makeItemParent(item, item.items);
    });
    // 激活当前路由对应的菜单项.
    this._mainMenus.forEach(item => {
      this.findMenuForActive(item, routeUrl);
    })
    // 设置默认侧边栏菜单
    if (this._mainMenus.length > 0) {
      let activeList = this._mainMenus.filter(x => !!x.active);
      if (activeList.length > 0) {
        this._sidebarMenus = activeList[0].items!;
      } else if (this._mainMenus[0].items != null) {
        this._sidebarMenus = this._mainMenus[0].items;
        this.makeSetActive(this._mainMenus[0].items[0]);
      }
    }
  }

  public setActiveMainMenu(item: KuMenuItem): void {
    this._mainMenus.forEach(row => {
      row.active = row === item;
    });
    this._sidebarMenus = item.items!;
  }

  private makeItemParent(parent: KuMenuItem, items?: KuMenuItem[]): void {
    if (items != null && items.length > 0) {
      items.forEach(item => {
        item.parent = parent;
        this.makeItemParent(item, item.items);
      });
    }
  }

  private findMenuForActive(item: KuMenuItem, url: string) {
    if (!!item) {
      if (!!item.items) {
        item.items.forEach(row => {
          this.findMenuForActive(row, url);
        })
      } else if (item.routerLink === url) {
        this.makeSetActive(item);
        return;
      }
    }
  }

  public makeSetActive(item: KuMenuItem): void {
    if (item) {
      // 设置当前选中项
      item.active = true;
      if (!!item.items) {
        item.isOpen = true;
      }
      if (item.parent) {
        this.makeSetActive(item.parent);
      }
    }
  }

  public cleanActiveMenu(): void {
    this._mainMenus.forEach(row => {
      this.cleanMenuActive(row.items!);
    })
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
