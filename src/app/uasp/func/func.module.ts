import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { RouterModule }                     from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KuInfoBarModule } from '@xinyue/uasp';
import { TableModule }     from 'primeng/table';
import { TreeModule }      from 'primeng/tree';

import { FuncClient, FuncService } from './services';
import { ROUTES }                  from './func.routing';
import { FuncManageComponent }     from './func-manage.component';
import { UaspChooseModule }        from '../choose/choose.module';
import { FuncTreeComponent }       from './views/func-tree.component';
import { FuncListComponent }       from './views/func-list.component';
import { FuncEditComponent } from './views/func-edit.component';

@NgModule({
  declarations: [
    FuncManageComponent,
    FuncTreeComponent,
    FuncListComponent,
    FuncEditComponent,
  ],
  imports     : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    TableModule,
    UaspChooseModule,
    KuInfoBarModule,
    TreeModule,
  ],
  providers   : [
    FuncClient,
    FuncService,
  ],
})
export class UaspFuncModule {
}
