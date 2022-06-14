import { CommonModule }       from '@angular/common';
import { NgModule }           from '@angular/core';
import { KuInfoBoxComponent } from './info-box.component';

@NgModule({
  declarations: [
    KuInfoBoxComponent,
  ],
  exports     : [
    KuInfoBoxComponent,
  ],
  imports     : [
    CommonModule,
  ],
})
export class KuInfoBoxModule {
}
