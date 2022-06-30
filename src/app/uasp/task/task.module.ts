import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }                     from '@angular/router';
import { KuInfoBarModule }                  from '@xinyue/uasp';
import { TableModule }                      from 'primeng/table';

import { TaskManageComponent } from './task-manage.component';
import { UaspChooseModule }    from '../choose/choose.module';
import { ROUTES }              from './task.routing';

@NgModule({
  declarations: [
    TaskManageComponent,
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
export class UaspTaskModule {
}
