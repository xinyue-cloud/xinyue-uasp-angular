import { CommonModule }     from '@angular/common';
import { NgModule }         from '@angular/core';
import { KuAlertComponent } from './alert.component';

@NgModule({
  declarations: [
    KuAlertComponent,
  ],
  exports     : [
    KuAlertComponent,
  ],
  imports     : [
    CommonModule,
  ],
})
export class KuAlertModule {
}
