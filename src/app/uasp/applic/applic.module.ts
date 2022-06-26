import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { RouterModule }                     from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KuInfoBarModule } from '@xinyue/uasp';
import { TableModule }     from 'primeng/table';

import { ROUTES }                      from './applic.routing';
import { ApplicClient, ApplicService } from './services';
import { ApplicManageComponent }       from './applic-manage.component';
import { ApplicEditComponent }         from './views/applic-edit.component';
import { ApplicListComponent }         from './views/applic-list.component';
import { TenantListComponent }         from './views/tenant-list.component';
import { CompanyListComponent }        from './views/company-list.component';
import { UaspChooseModule }            from '../choose/choose.module';

@NgModule({
  declarations: [
    ApplicManageComponent,
    ApplicEditComponent,
    ApplicListComponent,
    TenantListComponent,
    CompanyListComponent,
  ],
  imports     : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    TableModule,
    UaspChooseModule,
    KuInfoBarModule,
  ],
  providers   : [
    ApplicClient,
    ApplicService,
  ],
})

export class UaspApplicModule {
}
