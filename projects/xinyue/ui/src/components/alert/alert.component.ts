import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';

const ICONS = {
  info   : 'fas fa-info',
  warning: 'fas fas fa-exclamation-triangle',
  success: 'fas fas fa-check',
  danger : 'fas fa-ban',
};

@Component({
  selector       : 'div[ku-alert]',
  templateUrl    : './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuAlertComponent implements OnInit {

  @Input() isOpen = true;
  @Input() title!: string;
  @Input() callout = false;
  @Input() dismissible = true;
  @Input() type!: 'info' | 'warning' | 'success' | 'danger' | string;
  @Input() dismissOnTimeout!: number | string;

  @Output() onClose = new EventEmitter<KuAlertComponent>();
  @Output() onClosed = new EventEmitter<KuAlertComponent>();

  private _iconClass!: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
  ) {
  }

  @HostBinding('class')
  get hostClass(): string {
    return (this.callout ? 'callout callout-' : 'alert alert-') + this.type + (this.dismissible ? ' alert-dismissible' : '');
  }

  ngOnInit(): void {
    // 延时关闭
    if (this.dismissOnTimeout) {
      setTimeout(() => this.close(),
        parseInt(this.dismissOnTimeout as string, 10),
      );
    }
  }

  @Input() set iconClass(value: string) {
    this._iconClass = value;
  }

  get iconClass(): string {
    if (!this._iconClass) {
      // @ts-ignore
      return ICONS[this.type];
    }
    return this._iconClass;
  }

  close(): void {
    if (this.isOpen) {
      this.onClose.emit(this);
      this.isOpen = false;
      this.changeDetector.markForCheck();
      this.onClosed.emit(this);
    }
  }

}
