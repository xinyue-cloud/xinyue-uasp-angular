import { CommonModule }           from '@angular/common';
import { NgModule }               from '@angular/core';
import { KtProgressBarComponent } from './progress-bar.component';

@NgModule({
  declarations: [
    KtProgressBarComponent,
  ],
  imports     : [
    CommonModule,
  ],
  exports     : [
    KtProgressBarComponent,
  ],
})
export class KtProgressBarModule {
}
