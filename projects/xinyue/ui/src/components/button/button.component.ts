import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { KuButtonBgClass, KuButtonSizes, KuButtonThemes } from './button.types';

@Component({
  selector       : '[kButton]',
  templateUrl    : './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation  : ViewEncapsulation.None,
})
export class KuButtonComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() theme: KuButtonThemes = 'default';
  @Input() size!: KuButtonSizes;
  @Input() bgClass!: KuButtonBgClass;
  @Input() label!: string;

  @Input() icon!: string;
  @Input() iconPos = 'left';
  @Input() iconClass!: string;
  @Input() badge!: string;
  @Input() badgeClass!: string;

  @HostBinding('class.active')
  @Input() checked!: boolean;

  @Input() set block(value: any) {
    this._block = !!value || value === '';
  }

  @Input() set app(value: any) {
    this._app = !!value || value === '';
  }

  @Input() set outline(value: any) {
    this._outline = !!value || value === '';
  }

  @Input() set gradient(value: any) {
    this._gradient = !!value || value === '';
  }

  @Input() set flat(value: any) {
    this._flat = !!value || value === '';
  }

  @HostBinding('class')
  get hostClass(): string {
    return this._styleClass;
  }

  _app!: boolean;
  _block!: boolean;
  _outline!: boolean;
  _gradient!: boolean;
  _flat!: boolean;
  _styleClass!: string;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateStyleClass();
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.updateStyleClass();
  }

  updateStyleClass(): void {
    let styleClass = 'btn';
    if (this._block) {
      styleClass += ' btn-block';
    }
    if (this._app) {
      styleClass += ' btn-app';
    }
    if (this.theme) {
      if (this._outline) {
        styleClass += ' btn-outline-';
      } else if (this._gradient) {
        styleClass += ' bg-gradient-';
      } else {
        styleClass += ' btn-';
      }
      styleClass += this.theme;
    }
    if (this.size) {
      styleClass += ' btn-' + this.size;
    }
    if (this._flat) {
      styleClass += ' btn-flat';
    }
    if (this.bgClass) {
      styleClass += ' bg-' + this.bgClass;
    }
    this._styleClass = styleClass;
  }

}
