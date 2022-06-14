import { CommonModule }         from '@angular/common';
import { NgModule }             from '@angular/core';
import { KuSharedModule }       from '../../apis';
import { KuCardToolsComponent } from './card-tools.component';
import { KuCardComponent }      from './card.component';

@NgModule({
  declarations: [
    KuCardComponent,
    KuCardToolsComponent,
  ],
  imports     : [
    CommonModule,
    KuSharedModule,
  ],
  exports     : [
    KuCardComponent,
    KuCardToolsComponent,
  ],
})
export class KuCardModule {
}
