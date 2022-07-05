import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnInit,
  Provider,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KuSelectItem }                              from '@xinyue/core';
import { KuButtonThemes }                          from './button.types';

export const CHECKBOX_GROUP_CONTROL_VALUE_ACCESSOR: Provider = {
  provide    : NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => KuButtonCheckboxGroupComponent),
  multi      : true,
};

@Component({
  selector       : 'ku-BtnCheckbox',
  templateUrl    : './button-checkbox-group.component.html',
  providers      : [CHECKBOX_GROUP_CONTROL_VALUE_ACCESSOR],
  host           : {
    '[class.btn-group]'         : '!vertical',
    '[class.btn-group-vertical]': 'vertical',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuButtonCheckboxGroupComponent implements OnInit, ControlValueAccessor {

  @Input() items!: KuSelectItem[];
  @Input() theme!: KuButtonThemes;
  @Input() flat!: boolean;
  @Input() bgClass!: string;
  @Input() isDisabled!: boolean;
  @Input() vertical!: boolean;

  value: any;
  onChange = Function.prototype;
  onTouched = Function.prototype;

  constructor(
    private cd: ChangeDetectorRef,
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
    this.cd.markForCheck();
  }

  hasChecked(item: any): boolean {
    return !!this.value && this.value.indexOf(item.value) >= 0;
  }

  labelClick(item: any, $event: any): void {
    if (!this.isDisabled) {
      const checked = !this.hasChecked(item);
      const index = this.value.indexOf(item.value);
      if (checked && index === -1) {
        this.value.push(item.value);
      } else if (!checked && index >= 0) {
        this.value.splice(index, 1);
      }
      this.value = this.value.slice(0);
      this.onChange(this.value);
      this.cd.markForCheck();
    }
  }
}
