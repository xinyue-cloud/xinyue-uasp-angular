import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { KuMenuItem } from '../../models';

import { KuButtonThemes } from './button.types';

@Component({
  selector   : 'div[kBtnDropdown]',
  templateUrl: './button-dropdown.component.html',
  host       : {
    '[class.btn-group]'          : '!pos',
    '[class.input-group-prepend]': 'pos === "prepend"',
    '[class.input-group-append]' : 'pos === "append"',
    '[class.show]'               : 'show',
  },
})
export class KuButtonDropdownComponent implements OnInit {

  @Input() label!: string;
  @Input() theme: KuButtonThemes = 'default';
  @Input() menus!: KuMenuItem[];
  @Input() autoClose = true;
  @Input() pos!: 'prepend' | 'append' | string;

  @Input() set right(value: any) {
    this._right = true;
  }

  get right(): any {
    return this._right;
  }

  @Input() set up(value: any) {
    this._up = true;
  }

  get up(): any {
    return this._up;
  }

  @Input() set flat(value: any) {
    this._flat = !!value || value === '';
  }

  get flat(): any {
    return this._flat;
  }

  @Input()
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
  _right!: boolean;
  _up!: boolean;
  _flat!: boolean;
  _prepend!: boolean;
  _listenFn!: () => void;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit(): void {
  }

  onShow(): void {
    if (this.autoClose) {
      this._listenFn = this.renderer.listen('document', 'click', (event: any) => {
        if (!this.el.nativeElement.contains(event.target)) {
          if (this.show) {
            this.show = false;
          }
        }
      });
    }
  }

  onHide(): void {
    if (this.autoClose) {
      this._listenFn();
    }
  }

  get upStyles(): any {
    const styles = {};
    if (this._up) {
      // @ts-ignore
      styles['top'] = 'auto';
      // @ts-ignore
      styles['transform'] = 'translateY(-105%)';
    }
    return styles;
  }

  onDropdownClick(event: Event): void {
    this.show = !this.show;
  }

  itemClick(event: any, item: KuMenuItem): void {
    if (item.disabled) {
      event.preventDefault();
      return;
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

    if (this.show) {
      this.show = false;
    }
  }
}
