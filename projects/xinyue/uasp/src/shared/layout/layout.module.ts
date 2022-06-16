import { CommonModule }                     from '@angular/common';
import { NgModule }                         from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }                     from '@angular/router';

import { KuPipesModule }                                                    from '@xinyue/core';
import { KuApisModule, KuFullscreenModule }                                 from '@xinyue/ui';
import {
  KuBreadcrumbComponent,
  KuControlComponent,
  KuFooterComponent, KuHeaderComponent,
  KuNavbarMenuComponent,
  KuNavbarSubmenuComponent,
  KuSidebarComponent,
  KuSidebarItemComponent,
}                                                                           from './parts';
import { KuAdminLayoutComponent, KuPassportLayoutComponent }                from './layouts';
import { KuMessageComponent, KuNotificationComponent, KuUserMenuComponent } from './common';


@NgModule({
  declarations: [
    // common
    KuMessageComponent,
    KuNotificationComponent,
    KuUserMenuComponent,
    // Layout
    KuAdminLayoutComponent,
    KuPassportLayoutComponent,
    // parts
    KuBreadcrumbComponent,
    KuControlComponent,
    KuFooterComponent,
    KuHeaderComponent,
    KuSidebarComponent,
    KuSidebarItemComponent,
    KuNavbarMenuComponent,
    KuNavbarSubmenuComponent,
  ],
  imports     : [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    KuApisModule,
    KuPipesModule,
    KuFullscreenModule,
  ],
  exports     : [
    // common
    KuMessageComponent,
    KuNotificationComponent,
    KuUserMenuComponent,
    // Layout
    KuAdminLayoutComponent,
    KuPassportLayoutComponent,
    // parts
    KuBreadcrumbComponent,
    KuControlComponent,
    KuFooterComponent,
    KuHeaderComponent,
    KuSidebarComponent,
    KuSidebarItemComponent,
    KuNavbarMenuComponent,
    KuNavbarSubmenuComponent,
  ],
})
export class KuLayoutModule {
}
