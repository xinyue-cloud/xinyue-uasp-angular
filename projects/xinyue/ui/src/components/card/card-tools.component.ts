import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { KuCardComponent } from './card.component';

export class KtCardRefreshEvent {

  constructor(
    public card: KuCardComponent,
  ) {
  }

  set loading(value: boolean) {
    this.card.loading = value;
  }
}

@Component({
  selector   : 'ku-card-tools',
  templateUrl: './card-tools.component.html',
})
export class KuCardToolsComponent implements OnInit {

  @Input() showRefresh = false;
  @Input() showMaximize = false;
  @Input() showCollapse = false;
  @Input() showRemove = false;

  @Output() onRefresh: EventEmitter<KtCardRefreshEvent> = new EventEmitter();
  @Output() onRemove: EventEmitter<any> = new EventEmitter();
  @Output() onMaximize: EventEmitter<any> = new EventEmitter();
  @Output() onWindowed: EventEmitter<any> = new EventEmitter();
  @Output() onCollapse: EventEmitter<any> = new EventEmitter();
  @Output() onExpand: EventEmitter<any> = new EventEmitter();

  constructor(
    public card: KuCardComponent,
  ) {
  }

  ngOnInit(): void {
  }

  get allShow(): boolean {
    return !this.showRefresh && !this.showMaximize && !this.showCollapse && !this.showRemove;
  }

  refreshClick(): void {
    this.onRefresh.emit(new KtCardRefreshEvent(this.card));
  }

  removeClick(): void {
    this.onRemove.emit(this);
    this.card.showCard = false;
  }

  maximizeClick(): void {
    this.onRemove.emit(this);
  }

  collapseClick(): void {
    if (this.card.collapsed) {
      this.onExpand.emit(this);
    } else {
      this.onCollapse.emit(this);
    }
    this.card.collapsed = !this.card.collapsed;
  }
}
