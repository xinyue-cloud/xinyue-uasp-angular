import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule }  from 'ngx-bootstrap/modal';

import { ChooseTenantComponent } from './views/choose-tenant/choose-tenant.component';
import { ChooseService }         from './services/choose.service'
import { FormsModule }           from '@angular/forms';

@NgModule({
  declarations: [
    ChooseTenantComponent,
  ],
    imports: [
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
