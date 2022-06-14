import { CommonModule } from '@angular/common';
import { NgModule }     from '@angular/core';

import { KuContentTemplate } from './content.template';

@NgModule({
  declarations: [
    KuContentTemplate,
  ],
  imports     : [
    CommonModule,
  ],
  exports     : [
    KuContentTemplate,
  ],
})
export class KuSharedModule {
}
