import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChooseTenantComponent } from './views/choose-tenant/choose-tenant.component';

@NgModule({
  declarations: [
    ChooseTenantComponent,
  ],
  imports     : [
    CommonModule,
  ],
  exports     : [
    ChooseTenantComponent,
  ],
})
export class UaspChooserModule {
}
