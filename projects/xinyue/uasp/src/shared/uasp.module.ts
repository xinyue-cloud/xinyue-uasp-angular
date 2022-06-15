import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { RouterModule }        from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { KuAdminLayoutComponent }     from './layouts/admin-layout/admin-layout.component';
import { KuPassportLayoutComponent }  from './layouts/passport-layout/passport-layout.component';
import { KuLoginComponent }           from './views/passport/login/login.component';
import { KuForgotPasswordComponent }  from './views/passport/forgot-password/forgot-password.component';
import { KuRecoverPasswordComponent } from './views/passport/recover-password/recover-password.component';
import { KuRegisterComponent }        from './views/passport/register/register.component';
import { KuMessageComponent }         from './views/common/message/message.component';
import { KuNavbarMenuComponent }      from './views/common/navbar-menu/navbar-menu.component';
import { KuNotificationComponent }    from './views/common/notification/notification.component';
import { KuUserMenuComponent }        from './views/common/user-menu/user-menu.component';
import { KuErrorPageComponent }       from './views/auth/error-page/error-page.component';
import { KuLockscreenComponent }      from './views/auth/lockscreen/lockscreen.component';
import { KuNotFoundComponent }        from './views/auth/not-found/not-found.component';
import { KuUserProfileComponent }     from './views/auth/user-profile/user-profile.component';

@NgModule({
  declarations: [
    KuAdminLayoutComponent,
    // Common
    KuMessageComponent,
    KuNavbarMenuComponent,
    KuNotificationComponent,
    KuUserMenuComponent,
    // Passport
    KuPassportLayoutComponent,
    KuLoginComponent,
    KuForgotPasswordComponent,
    KuRecoverPasswordComponent,
    KuRegisterComponent,
    // Auth
    KuErrorPageComponent,
    KuLockscreenComponent,
    KuNotFoundComponent,
    KuUserProfileComponent,
  ],
  imports     : [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    KuApisModule,
    KuLayoutModule,
  ],
})
export class UaspModule {
}
