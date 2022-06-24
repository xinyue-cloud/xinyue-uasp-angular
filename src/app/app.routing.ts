import { NgModule }                                from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { InitialDataResolver } from './app.resolver';

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
} from '@xinyue/uasp';

import { BlankComponent }   from './views/blank/blank.component';
import { UaspApplicModule } from './uasp/applic';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'blank' },
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
      dataset: InitialDataResolver,
    },
    children   : [
      {
        path: 'uasp', children: [
          { path: 'applic', loadChildren: () => UaspApplicModule },
        ],
      },
      { path: 'blank', component: BlankComponent },
      { path: 'not-found', component: KuNotFoundComponent },
      { path: 'error-page', component: KuErrorPageComponent },
      { path: 'profile', component: KuUserProfileComponent },
    ],
  },
  { path: 'lock-screen', canActivate: [KuAuthGuard], component: KuLockscreenComponent },
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
