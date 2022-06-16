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

import { BlankComponent } from './views/blank/blank.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path     : '',
    component: KuPassportLayoutComponent,
    children : [
      { path: 'login', component: KuLoginComponent },
      { path: 'register', component: KuRegisterComponent },
      { path: 'rest-pwd', component: KuForgotPasswordComponent },
    ],
  },
  {
    path       : '',
    component  : KuAdminLayoutComponent,
    canActivate: [KuAuthGuard],
    resolve    : {
      //dataset: InitialDataResolver,
    },
    children   : [
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
