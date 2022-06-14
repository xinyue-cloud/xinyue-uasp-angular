import { CommonModule }       from '@angular/common';
import { NgModule }           from '@angular/core';
import { RouterModule }       from '@angular/router';
import { KtStatBoxComponent } from './stat-box.component';

@NgModule({
  declarations: [
    KtStatBoxComponent,
  ],
  imports     : [
    CommonModule,
    RouterModule,
  ],
  exports     : [
    KtStatBoxComponent,
  ],
})
export class KtStatBoxModule {
}
