import { CommonModule } from '@angular/common';
import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { RouterModule } from '@angular/router';

import { KuPipesModule } from '@xinyue/core';

import { KuFullscreenModule }                         from '../directives';
import { KuBreadcrumbComponent }                      from './parts/breadcrumb/breadcrumb.component';
import { KuControlComponent }                         from './parts/control/control.component';
import { KuFooterComponent }                          from './parts/footer/footer.component';
import { KuHeaderComponent }                          from './parts/header/header.component';
import { KuSidebarComponent, KuSidebarItemComponent } from './parts/sidebar/sidebar.component';

import { KuClassicComponent } from './layouts/classic/classic.component';
import { KuIframeComponent }  from './layouts/iframe/iframe.component';
import { KuApisModule }       from '../apis';

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
  ],
  imports     : [
    CommonModule,
    RouterModule,
    FormsModule,
    KuApisModule,
    KuPipesModule,
    KuFullscreenModule,
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
  ],
})
export class KuLayoutModule {
}
