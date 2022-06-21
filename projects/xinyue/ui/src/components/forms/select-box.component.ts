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
import { SelectItem }                              from '@xinyue/core';

const SELECT_BOX_CONTROL_VALUE_ACCESSOR: Provider = {
  provide    : NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => KuSelectBoxComponent),
  multi      : true,
};

@Component({
  selector       : 'ku-select-box',
  templateUrl    : './select-box.component.html',
  providers      : [SELECT_BOX_CONTROL_VALUE_ACCESSOR],
  host           : {
    '[class.form-group]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuSelectBoxComponent implements OnInit, ControlValueAccessor {

  @Input() items: SelectItem[] = [];
  @Input() isDisabled = false;
  @Input() name?: string;
  @Input() styleClass?: string;

  @Input() set multiple(value: any) {
    this._multiple = 'false' != value;
  }

  get multiple(): any {
    return this._multiple;
  }

  @Input() set inline(value: any) {
    this._inline = 'false' != value;
  }

  get inline(): boolean {
    return this._inline;
  }

  value: any;
  onChange = Function.prototype;
  onTouched = Function.prototype;

  private _inline = false;
  private _multiple = false;

  constructor(
    public cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
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
    if (this._multiple) {
      return !!this.value && this.value.indexOf(item.id) >= 0;
    } else {
      return this.value === item.id;
    }
  }

  checkChange(item: any, $event: any): void {
    if (!this.isDisabled) {
      if (this._multiple) {
        const checked = $event.target.checked;
        const index = this.value.indexOf(item.id);
        if (checked && index === -1) {
          this.value.push(item.id);
        } else if (!checked && index >= 0) {
          this.value.splice(index, 1);
        }
        this.value = this.value.slice(0);
      } else {
        this.value = item.id;
      }
      this.onChange(this.value);
      this.cd.markForCheck();
    }
  }
}
