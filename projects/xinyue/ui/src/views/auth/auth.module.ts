import { CommonModule }        from '@angular/common';
import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule }        from '@angular/router';

import { KuErrorPageComponent }       from './error-page/error-page.component';
import { KuForgotPasswordComponent }  from './forgot-password/forgot-password.component';
import { KuLockscreenComponent }      from './lockscreen/lockscreen.component';
import { KuLoginComponent }           from './login/login.component';
import { KuNotFoundComponent }        from './not-found/not-found.component';
import { KuRecoverPasswordComponent } from './recover-password/recover-password.component';
import { KuRegisterComponent }        from './register/register.component';
import { KuUserProfileComponent }     from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    KuForgotPasswordComponent,
    KuLockscreenComponent,
    KuLoginComponent,
    KuRecoverPasswordComponent,
    KuRegisterComponent,
    KuErrorPageComponent,
    KuNotFoundComponent,
    KuUserProfileComponent,
  ],
  imports     : [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports     : [
    KuForgotPasswordComponent,
    KuLockscreenComponent,
    KuLoginComponent,
    KuRecoverPasswordComponent,
    KuRegisterComponent,
    KuErrorPageComponent,
    KuNotFoundComponent,
    KuUserProfileComponent,
  ],
})
export class KuAuthModule {
}
