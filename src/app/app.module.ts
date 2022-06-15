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
  KuMockApiModule,
  KuPipesModule,
} from '@xinyue/core';

import { ToastrModule } from 'ngx-toastr';

import { mockApiServices }  from '../mock-api';
import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app.routing';

import { environment } from '../environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
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
  ],
  providers   : [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: KU_TOKEN_STORAGE, useValue: localStorage },
    { provide: KU_LOGGER_LEVEL, useValue: KuLevel.DEBUG },
    { provide: KuLoggerService, useClass: KuConsoleLoggerService },
  ],
  bootstrap   : [AppComponent],
  exports     : [],
})
export class AppModule {
}
