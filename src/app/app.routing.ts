import { NgModule }                                from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { InitialDataResolver }  from './app.resolver';
import { BlankComponent }       from './shared/views/blank/blank.component';
import { LoginComponent }       from './shared/views/login/login.component';
import { WelcomeComponent }     from './shared/views/welcome/welcome.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { GuideLayoutComponent } from './shared/layouts/guide-layout/guide-layout.component';
import { RegisterComponent }    from './shared/views/register/register.component';
import { RestPwdComponent }     from './shared/views/rest-pwd/rest-pwd.component';

import {
  KuAuthGuard,
  KuErrorPageComponent,
  KuLockscreenComponent,
  KuNotFoundComponent,
  KuUserProfileComponent,
} from '@xinyue/ui';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'work-center', pathMatch: 'full', redirectTo: 'msp/work-center' },
  {
    path     : '',
    component: GuideLayoutComponent,
    children : [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'rest-pwd', component: RestPwdComponent },
    ],
  },
  {
    path       : '',
    component  : AdminLayoutComponent,
    canActivate: [KuAuthGuard],
    resolve    : {
      dataset: InitialDataResolver,
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
