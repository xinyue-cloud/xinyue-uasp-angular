import { CommonModule }       from '@angular/common';
import { NgModule }           from '@angular/core';
import { KtTabItemComponent } from './tab-item.component';
import { KtTabViewComponent } from './tab-view.component';

@NgModule({
  declarations: [
    KtTabViewComponent,
    KtTabItemComponent,
  ],
  imports     : [
    CommonModule,
  ],
  exports     : [
    KtTabViewComponent,
    KtTabItemComponent,
  ],
})
export class KtTabViewModule {
}
