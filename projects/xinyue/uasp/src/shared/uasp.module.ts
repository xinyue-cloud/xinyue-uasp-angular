import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { RouterModule }                     from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KuHttpModule, KuPipesModule }  from '@xinyue/core';
import { KuApisModule, KuLayoutModule } from '@xinyue/ui';

import {
  KuAdminLayoutComponent,
  KuPassportLayoutComponent,
} from './layout';
import {
  KuErrorPageComponent,
  KuForgotPasswordComponent,
  KuLockscreenComponent,
  KuLoginComponent,
  KuMessageComponent,
  KuNavbarMenuComponent,
  KuNavbarSubmenuComponent,
  KuNotFoundComponent,
  KuNotificationComponent,
  KuRecoverPasswordComponent,
  KuRegisterComponent,
  KuUserMenuComponent,
  KuUserProfileComponent,
} from './views';


@NgModule({
  declarations: [
    // Layout
    KuAdminLayoutComponent,
    KuPassportLayoutComponent,
    // Common
    KuMessageComponent,
    KuNavbarMenuComponent,
    KuNotificationComponent,
    KuUserMenuComponent,
    // Passport
    KuLoginComponent,
    KuForgotPasswordComponent,
    KuRecoverPasswordComponent,
    KuRegisterComponent,
    // Auth
    KuErrorPageComponent,
    KuLockscreenComponent,
    KuNotFoundComponent,
    KuUserProfileComponent,
    KuNavbarSubmenuComponent,
  ],
  imports     : [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,

    KuPipesModule,
    KuHttpModule,
    KuApisModule,
    KuLayoutModule,
  ],
  exports     : [
    // Layout
    KuAdminLayoutComponent,
    KuPassportLayoutComponent,
    // Common
    KuMessageComponent,
    KuNavbarMenuComponent,
    KuNotificationComponent,
    KuUserMenuComponent,
    // Passport
    KuLoginComponent,
    KuForgotPasswordComponent,
    KuRecoverPasswordComponent,
    KuRegisterComponent,
    // Auth
    KuErrorPageComponent,
    KuLockscreenComponent,
    KuNotFoundComponent,
    KuUserProfileComponent,
    KuNavbarSubmenuComponent,
  ],
})
export class UaspModule {
}
