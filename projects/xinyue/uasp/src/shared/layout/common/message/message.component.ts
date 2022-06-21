import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { KuMessage } from '../../../models';

@Component({
  selector   : 'ku-layout-message',
  templateUrl: './message.component.html',
})
export class KuMessageComponent implements OnInit {

  @Input() items!: KuMessage[];

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

  get count(): number {
    return this.items ? this.items.length : 0;
  }

  get unReads(): number {
    return this.items ? this.items.filter(x => !x.read).length : 0;
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit(): void {
  }

  onToggle($event: any): void {
    this.show = !this.show;
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

}
