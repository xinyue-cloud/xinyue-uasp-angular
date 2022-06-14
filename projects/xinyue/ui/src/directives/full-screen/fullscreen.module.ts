import { NgModule }              from '@angular/core';
import { KuFullscreenDirective } from './fullscreen.directive';

@NgModule({
  declarations: [
    KuFullscreenDirective,
  ],
  exports     : [
    KuFullscreenDirective,
  ],
})
export class KuFullscreenModule {
}
