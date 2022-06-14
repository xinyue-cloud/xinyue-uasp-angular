import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { KuAccordionComponent }                             from './accordion.component';

@Component({
  selector   : 'ku-accordion-panel,[ku-accordion-panel]',
  templateUrl: './accordion-panel.component.html',
  host       : {
    '[class.card]': 'true',
  },
})
export class KuAccordionPanelComponent implements OnInit, OnDestroy {

  @Input() type!: 'primary' | 'info' | 'warning' | 'success' | 'danger' | string;
  @Input() panelClass!: string;
  @HostBinding('class.card-outline')
  @Input() outline = false;
  @Input() title!: string;
  @Input() isDisabled!: false;

  @HostBinding('class') get hostClass(): string {
    return this.type ? 'card-' + this.type : '';
  }

  _isOpen!: boolean;
  accordion: KuAccordionComponent;

  constructor(
    accordion: KuAccordionComponent,
  ) {
    this.accordion = accordion;
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  set isOpen(value: boolean) {
    if (value !== this.isOpen) {
      if (value) {
        this.accordion.closeOtherPanels(this);
      }
      this._isOpen = value;
    }
  }

  ngOnInit(): void {
    this.accordion.addGroup(this);
  }

  ngOnDestroy(): void {
    this.accordion.removeGroup(this);
  }

  toggleOpen(): void {
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
    }
  }

}
