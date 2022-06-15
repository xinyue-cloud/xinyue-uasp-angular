import { CommonModule }         from '@angular/common';
import { NgModule }             from '@angular/core';
import { KuCardToolsComponent } from './card-tools.component';
import { KuCardComponent } from './card.component';
import { KuApisModule }    from '../../apis';

@NgModule({
  declarations: [
    KuCardComponent,
    KuCardToolsComponent,
  ],
  imports     : [
    CommonModule,
    KuApisModule,
  ],
  exports     : [
    KuCardComponent,
    KuCardToolsComponent,
  ],
})
export class KuCardModule {
}
