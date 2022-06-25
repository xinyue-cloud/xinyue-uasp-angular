import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChooseTenantComponent } from './views/choose-tenant/choose-tenant.component';
import { ChooseService }         from './services/choose.service'

@NgModule({
  declarations: [
    ChooseTenantComponent,
  ],
  imports     : [
    CommonModule,
  ],
  providers   : [
    ChooseService,
  ],
  exports     : [
    ChooseTenantComponent,
  ],
})
export class UaspChooseModule {
}
