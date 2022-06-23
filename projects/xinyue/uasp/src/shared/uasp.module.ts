import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { RouterModule }                     from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KuHttpModule, KuPipesModule } from '@xinyue/core';
import { KuApisModule }                from '@xinyue/ui';

import {
  // auth
  KuErrorPageComponent,
  KuLockscreenComponent,
  KuNotFoundComponent,
  KuUserProfileComponent,
  // Passport
  KuForgotPasswordComponent,
  KuLoginComponent,
  KuRecoverPasswordComponent,
  KuRegisterComponent,
}                          from './views';
import { KuLayoutModule }  from './layout';
import { KuInfoBarModule } from './components';

@NgModule({
  declarations: [
    // auth
    KuErrorPageComponent,
    KuLockscreenComponent,
    KuNotFoundComponent,
    KuUserProfileComponent,
    // Passport
    KuForgotPasswordComponent,
    KuLoginComponent,
    KuRecoverPasswordComponent,
    KuRegisterComponent,
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
    KuInfoBarModule,
  ],
  exports     : [
    // auth
    KuErrorPageComponent,
    KuLockscreenComponent,
    KuNotFoundComponent,
    KuUserProfileComponent,
    // Passport
    KuForgotPasswordComponent,
    KuLoginComponent,
    KuRecoverPasswordComponent,
    KuRegisterComponent,
  ],
})
export class UaspSharedModule {
}
