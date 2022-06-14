import { CommonModule } from '@angular/common';
import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';

import { KuSelectBoxComponent } from './select-box.component';

@NgModule({
  declarations: [
    KuSelectBoxComponent,
  ],
  imports     : [
    CommonModule,
    FormsModule,
  ],
  exports     : [
    KuSelectBoxComponent,
  ],
})
export class KuFormsModule {
}
