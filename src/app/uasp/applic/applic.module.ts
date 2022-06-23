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
import { ApplicNewComponent }          from './views/applic-new.component';
import { ApplicTabsComponent }         from './views/applic-tabs.component';

@NgModule({
  declarations: [
    ApplicManageComponent,
    ApplicEditComponent,
    ApplicListComponent,
    ApplicNewComponent,
    ApplicTabsComponent,
  ],
  imports     : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    TableModule,
    KuInfoBarModule,
  ],
  providers   : [
    ApplicClient,
    ApplicService,
  ],
})

export class UaspApplicModule {
}
