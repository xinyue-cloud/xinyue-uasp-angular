import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { RouterModule }                     from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KuInfoBarModule } from '@xinyue/uasp';
import { TableModule }     from 'primeng/table';

import { FuncManageComponent } from './func-manage.component';
import { UaspChooseModule }    from '../choose/choose.module';
import { ROUTES }              from './func.routing';

@NgModule({
  declarations: [
    FuncManageComponent,
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
export class UaspFuncModule {
}
