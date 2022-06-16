import { DOCUMENT }           from '@angular/common';
import { Inject, Injectable } from '@angular/core';

export const KU_LAYOUT_FOOTER_FIXED = 'layout-footer-fixed';
export const KU_LAYOUT_NAVBAR_FIXED = 'layout-navbar-fixed';
export const KU_CONTROL_SIDEBAR_SLIDE_OPEN = 'control-sidebar-slide-open';
export const KU_SIDEBAR_COLLAPSE = 'sidebar-collapse';
export const KU_SIDEBAR_MINI = 'sidebar-mini';
export const KU_LAYOUT_FIXED = 'layout-fixed';
export const KU_DARK_MODE = 'dark-mode';
export const KU_TEXT_SM = 'text-sm';
export const KU_HOLD_TRANSITION = 'hold-transition';

@Injectable({
  providedIn: 'root',
})
export class KuLayoutService {

  set sidebarCollapse(value: boolean) {
    this.addBodyClass(value, KU_SIDEBAR_COLLAPSE);
  }

  get sidebarCollapse(): boolean {
    return this.hasBodyClass(KU_SIDEBAR_COLLAPSE);
  }

  set sidebarFixed(value: boolean) {
    this.addBodyClass(value, KU_LAYOUT_FIXED);
  }

  get sidebarFixed(): boolean {
    return this.hasBodyClass(KU_LAYOUT_FIXED);
  }

  set sidebarMini(value: boolean) {
    this.addBodyClass(value, KU_SIDEBAR_MINI);
  }

  get sidebarMini(): boolean {
    return this.hasBodyClass(KU_SIDEBAR_MINI);
  }

  set footerFixed(value: boolean) {
    this.addBodyClass(value, KU_LAYOUT_FOOTER_FIXED);
  }

  get footerFixed(): boolean {
    return this.hasBodyClass(KU_LAYOUT_FOOTER_FIXED);
  }

  set headerFixed(value: boolean) {
    this.addBodyClass(value, KU_LAYOUT_NAVBAR_FIXED);
  }

  get headerFixed(): boolean {
    return this.hasBodyClass(KU_LAYOUT_NAVBAR_FIXED);
  }

  set controlOpened(value: boolean) {
    this.addBodyClass(value, KU_CONTROL_SIDEBAR_SLIDE_OPEN);
  }

  get controlOpened(): boolean {
    return this.hasBodyClass(KU_CONTROL_SIDEBAR_SLIDE_OPEN);
  }

  set darkMode(value: boolean) {
    this.addBodyClass(value, KU_DARK_MODE);
  }

  get darkMode(): boolean {
    return this.hasBodyClass(KU_DARK_MODE);
  }

  set bodyTextSm(value: boolean) {
    this.addBodyClass(value, KU_TEXT_SM);
  }

  get bodyTextSm(): boolean {
    return this.hasBodyClass(KU_TEXT_SM);
  }

  headerNoBorder!: boolean;
  sidebarNoExpand!: boolean;

  navFlat!: boolean;
  navCompact!: boolean;
  navLegacy!: boolean;
  navChildIndent!: boolean;
  navHideOnCollapse!: boolean;

  wrapperClass: any;
  contentClass: any;
  contentWrapperClass: any;

  bodyClass: DOMTokenList;

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.bodyClass = document.body.classList;
  }

  private addBodyClass(value: boolean, className: string): void {
    setTimeout(() => {
      if (value && !this.bodyClass.contains(className)) {
        this.bodyClass.add(className);
      } else if (!value && this.bodyClass.contains(className)) {
        this.bodyClass.remove(className);
      }
    });
  }

  private hasBodyClass(className: string): boolean {
    return this.bodyClass.contains(className);
  }

}
