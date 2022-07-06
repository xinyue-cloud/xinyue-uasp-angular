import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { ModalModule }  from 'ngx-bootstrap/modal';

import { ChooseTenantComponent } from './views/choose-tenant/choose-tenant.component';
import { ChooseService }         from './services'

@NgModule({
  declarations: [
    ChooseTenantComponent,
  ],
  imports     : [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
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
