import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

export type ProgressbarType = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | string;

@Component({
  selector   : 'ku-progress',
  templateUrl: './progress-bar.component.html',
  host       : {
    '[class.progress]': 'true',
  },
})
export class KtProgressBarComponent implements OnInit, OnChanges {

  @Input() striped = false;
  @Input() animate = false;
  @Input() type: ProgressbarType = 'primary';
  @Input() value!: number;
  @Input() label?: string;
  @Input() max: number = 100;

  _vertical = false;
  percent = 0;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["value"]) {
      this.value = changes["value"].currentValue;
      this.recalculatePercentage();
    }
  }

  @Input() set vertical(value: boolean) {
    this._vertical = value;
    if (value) {
      this.renderer.addClass(this.el.nativeElement, 'vertical');
    }
  }

  @Input() set size(value: 'sm' | 'xs' | 'xxs') {
    this.renderer.addClass(this.el.nativeElement, 'progress-' + value);
  }

  @Input() set panelClass(value: string) {
    this.renderer.addClass(this.el.nativeElement, value);
  }

  get bgClass(): string {
    return `bg-${this.type}`;
  }

  get barStyles(): any {
    const styles = {};
    if (this._vertical) {
      // @ts-ignore
      styles['width.%'] = 100;
      // @ts-ignore
      styles['height.%'] = this.percent;
    } else {
      // @ts-ignore
      styles['height.%'] = 100;
      // @ts-ignore
      styles['width.%'] = this.percent;
    }
    return styles;
  }

  recalculatePercentage(): void {
    this.percent = +(this.value / this.max * 100).toFixed(2);
  }

}
