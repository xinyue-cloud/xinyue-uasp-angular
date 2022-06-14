import { ChangeDetectorRef, Component, forwardRef, Input, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR }                           from '@angular/forms';

import { KuSelectItem }   from "@xinyue/core";
import { KuButtonThemes } from './button.types';

export const RADIO_GROUP_CONTROL_VALUE_ACCESSOR: Provider = {
  provide    : NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => KuButtonRadioGroupComponent),
  multi      : true,
};

@Component({
  selector   : 'ku-BtnRadio',
  templateUrl: './button-radio-group.component.html',
  providers  : [RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
  host       : {
    '[class.btn-group]'         : '!vertical',
    '[class.btn-group-vertical]': 'vertical',
  },
})
export class KuButtonRadioGroupComponent implements OnInit, ControlValueAccessor {

  @Input() items!: KuSelectItem[];
  @Input() theme!: KuButtonThemes;
  @Input() flat = false;
  @Input() bgClass!: string;
  @Input() isDisabled!: boolean;
  @Input() vertical!: boolean;

  @Input() get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
  }

  private _value: any;

  protected onChange = Function.prototype;
  protected onTouched = Function.prototype;

  constructor(
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
  }

  buttonClass(item: KuSelectItem): string {
    let styleClass = '';
    if (this.theme) {
      styleClass += ' btn-' + this.theme;
    }
    if (this.bgClass) {
      styleClass += ' bg-' + this.bgClass;
    }
    if (item.styleClass) {
      styleClass += ' ' + item.styleClass;
    }
    return styleClass;
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
    this.value = value;
  }

  labelClick(item: KuSelectItem, $event: MouseEvent): void {
    if (!this.isDisabled) {
      this.value = item.id;
      this.onChange(this.value);
    }
  }
}
