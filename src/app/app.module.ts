import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule }                                     from '@angular/common/http';
import { NgModule }                                             from '@angular/core';
import { FormsModule, ReactiveFormsModule }                     from '@angular/forms';
import { BrowserModule }                                        from '@angular/platform-browser';
import { BrowserAnimationsModule }                              from '@angular/platform-browser/animations';
import { RouterModule }                                         from '@angular/router';

import {
  KU_LOGGER_LEVEL,
  KU_TOKEN_STORAGE,
  KuLoggerService,
  KuConsoleLoggerService,
  KuHttpModule, KuLevel,
  KuPipesModule,
  KuTipService,
  KuAlertService,
  KuConfigService,
}                           from '@xinyue/core';
import { UaspSharedModule } from '@xinyue/uasp';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app.routing';
import { environment }      from '../environments/environment.prod';
import { BlankComponent }   from './views/blank/blank.component';
import { UrlConfigService } from './shared/services/config.service';
import { ToastrTipService } from './shared/services/toastr-tip.service';
import { SwalAlertService } from './shared/services/swal-alert.service';

@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
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
    KuPipesModule,
    UaspSharedModule,
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
