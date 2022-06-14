import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

import { KuAlertService, KuLoggerService } from "@xinyue/core";

import { KuAuthService } from "../../../auth";

@Component({
  selector   : 'ku-user-menu',
  templateUrl: './user-menu.component.html',
})
export class KuUserMenuComponent implements OnInit {

  set show(value: boolean) {
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
    private alertService: KuAlertService,
    private logger: KuLoggerService,
    private authService: KuAuthService,
  ) {
  }

  ngOnInit(): void {
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

  logout(): void {
    this.alertService.confirm('注销', '是否确认注销并返回登录页？').then((result: any) => {
      if (result.value) {
        this.authService.logout();
      }
    });
  }

  toggle(): void {
    this.show = !this.show;
  }
}
