import { DOCUMENT }           from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { KuTokenStorage }  from '@xinyue/core';
import { KuLayoutService } from './layout.service';

const DATA_KEY = 'lte.pushmenu';
const EVENT_KEY = `.${DATA_KEY}`;

const CLASS_NAME_COLLAPSED = 'sidebar-collapse';
const CLASS_NAME_OPEN = 'sidebar-open';
const CLASS_NAME_CLOSED = 'sidebar-closed';

@Injectable({
  providedIn: 'root',
})
export class KuSidebarService {

  private readonly options: any = {
    autoCollapseSize       : 992,
    enableRemember         : false,
    noTransitionAfterReload: true,
  };

  private bodyClass: DOMTokenList;
  private body: HTMLElement;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private layout: KuLayoutService,
    private storageService: KuTokenStorage,
  ) {
    this.body = document.body;
    this.bodyClass = document.body.classList;
  }

  expand(): void {
    if (this.options.autoCollapseSize && this.body.clientWidth <= this.options.autoCollapseSize) {
      this.bodyClass.add(CLASS_NAME_OPEN);
    }
    this.bodyClass.remove(CLASS_NAME_COLLAPSED, CLASS_NAME_CLOSED);
    if (this.options.enableRemember) {
      this.storageService.setItem(`remember${EVENT_KEY}`, CLASS_NAME_OPEN);
    }
  }

  collapse(): void {
    if (this.options.autoCollapseSize && this.body.clientWidth <= this.options.autoCollapseSize) {
      this.bodyClass.remove(CLASS_NAME_OPEN);
      this.bodyClass.add(CLASS_NAME_CLOSED);
    }
    this.bodyClass.add(CLASS_NAME_COLLAPSED);
    if (this.options.enableRemember) {
      this.storageService.setItem(`remember${EVENT_KEY}`, CLASS_NAME_COLLAPSED);
    }
  }

  toggle(): void {
    if (this.layout.sidebarCollapse) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  autoCollapse(resize = false): void {

    if (this.body.clientWidth <= this.options.autoCollapseSize) {
      if (!this.bodyClass.contains(CLASS_NAME_OPEN)) {
        this.collapse();
      }
    } else if (resize) {
      if (this.bodyClass.contains(CLASS_NAME_OPEN)) {
        this.bodyClass.remove(CLASS_NAME_OPEN);
      } else if (this.bodyClass.contains(CLASS_NAME_CLOSED)) {
        this.expand();
      }
    }
  }

  remember(): void {
    if (!this.options.enableRemember) {
      return;
    }
    const toggleState = this.storageService.getItem(`remember${EVENT_KEY}`);
    if (toggleState === CLASS_NAME_COLLAPSED) {
      this.bodyClass.add(CLASS_NAME_COLLAPSED);
    } else {
      this.bodyClass.remove(CLASS_NAME_COLLAPSED);
    }
  }

}
