import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes }        from './applic.routing';
import { ApplicClient }  from './services/applic.client';
import { ApplicService } from './services/applic.service';

import { ApplicManageComponent } from './applic-manage.component';
import { ApplicDetailComponent } from './views/applic-detail.component';
import { ApplicListComponent }   from './views/applic-list.component';
import { ApplicNewComponent }    from './views/applic-new.component';
import { TableModule }           from 'primeng/table';

@NgModule({
  declarations: [
    ApplicManageComponent,
    ApplicDetailComponent,
    ApplicListComponent,
    ApplicNewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
  ],
  providers   : [
    ApplicClient,
    ApplicService,
  ],
})

export class ApplicModule {
}
