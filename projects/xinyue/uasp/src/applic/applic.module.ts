import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { RouterModule }                     from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';

import { ROUTES }                      from './applic.routing';
import { ApplicClient, ApplicService } from './services';

import { ApplicManageComponent } from './applic-manage.component';
import { ApplicDetailComponent } from './views/applic-detail.component';
import { ApplicListComponent }   from './views/applic-list.component';
import { ApplicNewComponent }    from './views/applic-new.component';

@NgModule({
  declarations: [
    ApplicManageComponent,
    ApplicDetailComponent,
    ApplicListComponent,
    ApplicNewComponent,
  ],
  imports     : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    TableModule,
  ],
  providers   : [
    ApplicClient,
    ApplicService,
  ],
})

export class UaspApplicModule {
}
