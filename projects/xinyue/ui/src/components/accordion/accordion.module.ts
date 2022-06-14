import { CommonModule }              from '@angular/common';
import { NgModule }                  from '@angular/core';
import { KuAccordionPanelComponent } from './accordion-panel.component';

import { KuAccordionComponent } from './accordion.component';

@NgModule({
  declarations: [
    KuAccordionComponent,
    KuAccordionPanelComponent,
  ],
  imports     : [
    CommonModule,
  ],
  exports     : [
    KuAccordionComponent,
    KuAccordionPanelComponent,
  ],
})
export class KuAccordionModule {
}
