import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Router }                                          from '@angular/router';
import { KuMenuItem }                                      from '@xinyue/ui';
import { KuMenuService }                                   from '../../../services';

@Component({
  selector   : 'ku-navbar-menu',
  templateUrl: './navbar-menu.component.html',
})
export class KuNavbarMenuComponent implements OnInit {

  @Input() item!: KuMenuItem;
  _listenFn!: () => void;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private menuService: KuMenuService,
  ) {
  }

  ngOnInit(): void {
  }

  menuClick(item: KuMenuItem, event: any): void {

    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (!!item.items) {
      this.menuService.setActiveMainMenu(item);
      event.preventDefault();
      return;
    }

    if (item.routerLink) {
      this.router.navigate(item.routerLink).then();
    }

    if (!item.url) {
      event.preventDefault();
    }

    if (item.command) {
      item.command({
        originalEvent: event,
        item,
      });
    }
  }
}

@Component({
  selector   : '[kNavbarSubMenu]',
  templateUrl: './navbar-submenu.component.html',
})
export class KuNavbarSubmenuComponent implements OnInit {

  @Input() menus!: KuMenuItem[];

  constructor(
    public navbar: KuNavbarMenuComponent,
  ) {
  }

  ngOnInit(): void {
  }

}
