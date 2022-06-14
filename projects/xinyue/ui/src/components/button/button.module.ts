import { CommonModule }                   from '@angular/common';
import { NgModule }                       from '@angular/core';
import { KuButtonCheckboxGroupComponent } from './button-checkbox-group.component';
import { KuButtonCheckboxDirective }      from './button-checkbox.directive';
import { KuButtonDropdownComponent }      from './button-dropdown.component';
import { KuButtonRadioGroupComponent }    from './button-radio-group.component';

import { KuButtonComponent } from './button.component';

@NgModule({
  declarations: [
    KuButtonComponent,
    KuButtonCheckboxDirective,
    KuButtonDropdownComponent,
    KuButtonRadioGroupComponent,
    KuButtonCheckboxGroupComponent,
  ],
  imports     : [
    CommonModule,
  ],
  exports     : [
    KuButtonComponent,
    KuButtonCheckboxDirective,
    KuButtonDropdownComponent,
    KuButtonRadioGroupComponent,
    KuButtonCheckboxGroupComponent,
  ],
})
export class KuButtonModule {
}
