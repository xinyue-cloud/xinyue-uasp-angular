import { Directive, forwardRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR }                         from '@angular/forms';
import { KuButtonThemes }                                                  from './button.types';

@Directive({
  selector : '[kBtnCheckbox]',
  providers: [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KuButtonCheckboxDirective),
      multi      : true,
    },
  ],
})
export class KuButtonCheckboxDirective implements ControlValueAccessor, OnInit {

  @Input() theme: KuButtonThemes = 'default';

  @Input() set trueValue(value: any) {
    this._trueValue = value;
  }

  @Input() set falseValue(value: any) {
    this._falseValue = value;
  }

  @HostBinding('class.active')
  @HostBinding('attr.aria-pressed')
  private checked = false;

  protected value!: boolean | string;
  protected isDisabled!: boolean;

  protected onChange = Function.prototype;
  protected onTouched = Function.prototype;

  private _trueValue: any;
  private _falseValue: any;
  private _styleClass!: string;

  constructor() {
  }

  get trueValue(): any {
    return typeof this._trueValue !== 'undefined'
      ? this._trueValue
      : true;
  }

  get falseValue(): any {
    return typeof this._falseValue !== 'undefined'
      ? this._falseValue
      : false;
  }

  @HostListener('click')
  onClick(): void {
    if (this.isDisabled) {
      return;
    }
    this.toggle(!this.checked);
    this.onChange(this.value);
  }

  @HostBinding('class')
  get hostClass(): string {
    return this._styleClass;
  }

  toggle(checked: boolean): void {
    this.checked = checked;
    this.value = this.checked ? this.trueValue : this.falseValue;
  }

  ngOnInit(): void {
    this.updateStyleClass();
    this.toggle(this.trueValue === this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: any): void {
    this.checked = this.trueValue === value;
    this.value = value ? this.trueValue : this.falseValue;
  }

  updateStyleClass(): void {
    let styleClass = 'btn';
    if (this.theme) {
      styleClass += ' btn-' + this.theme;
    }
    this._styleClass = styleClass;
  }
}
