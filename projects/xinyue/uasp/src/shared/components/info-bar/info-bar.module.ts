import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { KuInfoBarComponent } from './info-bar.component';

@NgModule({
  declarations: [
    KuInfoBarComponent,
  ],
  imports     : [
    CommonModule,
  ],
  exports     : [
    KuInfoBarComponent,
  ],
})
export class KuInfoBarModule {
}
