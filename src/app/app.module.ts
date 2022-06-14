import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule }                                     from '@angular/common/http';
import { NgModule }                                             from '@angular/core';
import { FormsModule, ReactiveFormsModule }                     from '@angular/forms';
import { BrowserModule }                                        from '@angular/platform-browser';
import { BrowserAnimationsModule }                              from '@angular/platform-browser/animations';
import { RouterModule }                                         from '@angular/router';

import { mockApiServices }      from '../mock-api';
import { AppComponent }         from './app.component';
import { AppRoutingModule }     from './app.routing';
import { BlankComponent }       from './shared/views/blank/blank.component';
import { LoginComponent }       from './shared/views/login/login.component';
import { WelcomeComponent }     from './shared/views/welcome/welcome.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { GuideLayoutComponent } from './shared/layouts/guide-layout/guide-layout.component';
import { RegisterComponent }    from './shared/views/register/register.component';
import { RestPwdComponent }     from './shared/views/rest-pwd/rest-pwd.component';

import {
  KU_LOGGER_LEVEL,
  KU_TOKEN_STORAGE,
  KuAlertService,
  KuTipService,
  KuConfigService,
  KuLoggerService,
  KuConsoleLoggerService,
  KuHttpModule, KuLevel,
  KuMockApiModule,
  KuPipesModule,
} from '@xinyue/core';

import {
  KuCarouselModule,
  KuAuthModule,
  KuLayoutModule,
  KuSharedModule,
}                           from '@xinyue/ui';
import { environment }      from '../environments/environment.prod';
import { ToastrModule }     from 'ngx-toastr';
import { ToastrTipService } from './shared/services/toastr-tip.service';
import { SwalAlertService } from './shared/services/swal-alert.service';
import { UrlConfigService } from './shared/services/config.service';

@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    LoginComponent,
    WelcomeComponent,
    AdminLayoutComponent,
    GuideLayoutComponent,
    RegisterComponent,
    RestPwdComponent,
  ],
  imports     : [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(environment.tipOptions),
    KuHttpModule,
    KuMockApiModule.forRoot(mockApiServices, {
      closed: false,
    }),
    KuPipesModule,
    KuSharedModule,
    KuAuthModule,
    KuLayoutModule,
    KuCarouselModule,
  ],
  providers   : [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: KU_TOKEN_STORAGE, useValue: localStorage },
    { provide: KU_LOGGER_LEVEL, useValue: KuLevel.DEBUG },
    { provide: KuLoggerService, useClass: KuConsoleLoggerService },
    { provide: KuTipService, useClass: ToastrTipService },
    { provide: KuAlertService, useClass: SwalAlertService },
    { provide: KuConfigService, useClass: UrlConfigService },
  ],
  bootstrap   : [AppComponent],
  exports     : [],
})
export class AppModule {
}
