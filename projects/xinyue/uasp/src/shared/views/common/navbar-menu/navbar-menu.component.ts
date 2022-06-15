import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Router }                                          from '@angular/router';

import { KuMenuItem } from '../../../model/menu-item';

@Component({
  selector   : 'ku-navbar-menu',
  templateUrl: './navbar-menu.component.html',
})
export class KuNavbarMenuComponent implements OnInit {

  @Input() item!: KuMenuItem;

  @Input() set show(value: boolean) {
    if (this._show !== value) {
      this._show = value;
      if (value) {
        this.onShow();
      } else {
        this.onHide();
      }
    }
  }

  get show(): boolean {
    return this._show;
  }

  _show!: boolean;
  _listenFn!: () => void;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
  ) {
  }

  onShow(): void {
    this._listenFn = this.renderer.listen('document', 'click', (event: any) => {
      if (!this.el.nativeElement.contains(event.target)) {
        if (this.show) {
          this.show = false;
        }
      }
    });
  }

  onHide(): void {
    this._listenFn();
  }

  ngOnInit(): void {
  }

  menuClick(item: KuMenuItem, event: any): void {

    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (item.routerLink) {
      this.router.navigate(item.routerLink).then(r => {
      });
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

    this.show = !this.show;
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
