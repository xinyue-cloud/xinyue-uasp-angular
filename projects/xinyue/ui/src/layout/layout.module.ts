import { CommonModule } from '@angular/common';
import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { RouterModule } from '@angular/router';

import { KuSharedModule }                                  from '../apis';
import { KuFullscreenModule }                              from '../directives';
import { KuMessageComponent }                              from './common/message/message.component';
import { KuNavbarMenuComponent, KuNavbarSubmenuComponent } from './common/navbar-menu/navbar-menu.component';
import { KuNotificationComponent }                         from './common/notification/notification.component';
import { KuUserMenuComponent }                             from './common/user-menu/user-menu.component';
import { KuBreadcrumbComponent }                           from './parts/breadcrumb/breadcrumb.component';
import { KuControlComponent }                              from './parts/control/control.component';
import { KuFooterComponent }                               from './parts/footer/footer.component';
import { KuHeaderComponent }                               from './parts/header/header.component';
import { KuSidebarComponent, KuSidebarItemComponent }      from './parts/sidebar/sidebar.component';

import { KuClassicComponent } from './layouts/classic/classic.component';
import { KuIframeComponent }  from './layouts/iframe/iframe.component';
import { KuPipesModule }      from "@xinyue/core";

@NgModule({
  declarations: [
    KuClassicComponent,
    KuIframeComponent,
    KuBreadcrumbComponent,
    KuControlComponent,
    KuFooterComponent,
    KuHeaderComponent,
    KuSidebarComponent,
    KuSidebarItemComponent,
    KuUserMenuComponent,
    KuNavbarMenuComponent,
    KuNavbarSubmenuComponent,
    KuMessageComponent,
    KuNotificationComponent,
  ],
  imports     : [
    CommonModule,
    RouterModule,
    KuPipesModule,
    FormsModule,

    KuFullscreenModule,
    KuSharedModule,
  ],
  exports     : [
    KuClassicComponent,
    KuIframeComponent,
    KuBreadcrumbComponent,
    KuControlComponent,
    KuFooterComponent,
    KuHeaderComponent,
    KuSidebarComponent,
    KuSidebarItemComponent,
    KuUserMenuComponent,
    KuNavbarMenuComponent,
    KuNavbarSubmenuComponent,
    KuMessageComponent,
    KuNotificationComponent,
  ],
})
export class KuLayoutModule {
}
