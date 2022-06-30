import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }                     from '@angular/router';
import { KuInfoBarModule }                  from '@xinyue/uasp';
import { TableModule }                      from 'primeng/table';

import { UaspChooseModule }       from '../choose/choose.module';
import { ProfileManageComponent } from './profile-manage.component';
import { ROUTES }                 from './profile.routing';

@NgModule({
  declarations: [
    ProfileManageComponent,
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
})
export class UaspProfileModule {
}
