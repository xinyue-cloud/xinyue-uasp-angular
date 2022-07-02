import { NgModule }                                from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {
  KuAuthGuard,
  KuAdminLayoutComponent,
  KuPassportLayoutComponent,
  KuForgotPasswordComponent,
  KuLoginComponent,
  KuRegisterComponent,
  KuErrorPageComponent,
  KuLockscreenComponent,
  KuNotFoundComponent,
  KuUserProfileComponent,
  KuInitAuthResolver,
} from '@xinyue/uasp';

import { BlankComponent } from './views/blank/blank.component';

import { UaspApplicModule }  from './uasp/applic';
import { UaspFuncModule }    from './uasp/func';
import { UaspTaskModule }    from './uasp/task';
import { UaspProfileModule } from './uasp/profile';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/uasp/tasks' },
  {
    path     : 'passport',
    component: KuPassportLayoutComponent,
    children : [
      { path: 'login', component: KuLoginComponent },
      { path: 'register', component: KuRegisterComponent },
      { path: 'forgot-password', component: KuForgotPasswordComponent },
    ],
  },
  {
    path       : '',
    component  : KuAdminLayoutComponent,
    canActivate: [KuAuthGuard],
    resolve    : {
      data: KuInitAuthResolver,
    },
    children   : [
      {
        path: 'uasp', children: [
          { path: 'applic', loadChildren: () => UaspApplicModule },
          { path: 'module', loadChildren: () => UaspFuncModule },
          { path: 'tasks', loadChildren: () => UaspTaskModule },
          { path: 'profile', loadChildren: () => UaspProfileModule },
        ],
      },
      { path: 'blank', component: BlankComponent },
      { path: 'not-found', component: KuNotFoundComponent },
      { path: 'error-page', component: KuErrorPageComponent },
      { path: 'profile', component: KuUserProfileComponent },
      { path: 'lock-screen', component: KuLockscreenComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy       : PreloadAllModules,
      relativeLinkResolution   : 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
