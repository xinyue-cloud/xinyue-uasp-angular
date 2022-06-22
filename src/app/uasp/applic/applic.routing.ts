import { Routes }                from '@angular/router';
import { ApplicManageComponent } from './applic-manage.component';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'manage' },
  { path: 'manage', component: ApplicManageComponent },
];
