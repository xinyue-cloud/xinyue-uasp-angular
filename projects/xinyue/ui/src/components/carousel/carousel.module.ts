import { CommonModule }            from '@angular/common';
import { NgModule }                from '@angular/core';
import { KuCarouselItemComponent } from './carousel-item.component';
import { KuCarouselComponent }     from './carousel.component';

@NgModule({
  declarations: [
    KuCarouselComponent,
    KuCarouselItemComponent,
  ],
  imports     : [
    CommonModule,
  ],
  exports     : [
    KuCarouselComponent,
    KuCarouselItemComponent,
  ],
})
export class KuCarouselModule {
}
